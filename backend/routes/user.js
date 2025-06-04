const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const axios = require("axios");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "이미 존재하는 사용자입니다." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: "회원가입이 완료되었습니다." });
  } catch (error) {
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    //password는 mongoDB에서 제외하고 보내므로 password까지 같이 받아온다.
    const user = await User.findOne({ username }).select("+password");

    if (!user) {
      //user정보가 없다면
      return res.status("401").json({ message: "사용자를 찾을 수 없습니다." });
    }

    if (!user.isActive) {
      //비밀번호를 5회 이상 틀려 잠긴 계정인 경우
      return res
        .status(401)
        .json({ message: "비활성화된 계정입니다. 관리자에게 문의하세요." });
    }

    if (user.isLoggedIn) {
      return res
        .status(401)
        .json({ message: "이미 다른 기기에서 로그인되어 있습니다." });
    }

    //비밀번호가 일치하는지 검증
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      //비밀번호가 틀렷다면
      user.failedLoginAttempts += 1; //틀린 횟수 증가
      user.lastLoginAttempt = new Date();
      //5회 이상 틀렸다면
      if (user.failedLoginAttempts >= 5) {
        user.isActive = false;
        await user.save();
        return res
          .status(401)
          .json({
            message: "비밀번호를 5회 이상 틀려 계정이 비활성화 되었습니다.",
          });
      }
      await user.save();
      return res.status(401).json({message: "비밀번호가 일치하지 않습니다.", remainingAttempts:5 - user.failedLoginAttempts});
    }

    user.failedLoginAttempts = 0;
    user.lastLoginAttempt = new Date();
    user.isLoggedIn = true;

    try{
      //공인 ip를 가져온다.(보안이 취약한곳에서는 조심해야한다.)
      const response = await axios.get("https://api.ipify.org?format=json");
      const ipAddress = response.data.ip;
      user.ipAddress = ipAddress;
    }catch(error){
      console.log("IP 주소를 가져오던 중 오류 발생: ", error,message);
    }
    await user.save();
    
    const token = jwt.sign({ userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "24h" } //유효시간(24시간 후 다시 로그인 해야한다)
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    res.json({user:userWithoutPassword});
    
  } catch (error) {
    console.log("서버 오류: ", error.message);
    res.status(500).json({ message: "서버 오류가 발생했습니다."});
  }
});

module.exports = router;
