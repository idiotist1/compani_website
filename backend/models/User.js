const mongoose = require("mongoose");

//스키마 생성
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true, //trim을 true로 하면 좌우 공백을 제거해준다.
      minlength: 2,
      maxlength: 30,
    },
    password: {
      type: String,
      required: true,
      select: false, //Query결과에 빠지도록
    },
    isLoggedIn: {
      //로그인 했는지 여부(true라면 다른곳에서 로그인할 수 없다.)
      type: Boolean,
      default: false,
    },
    isActive: {
      //몇회 이상 비밀번호를 틀린경우 계정 잠김
      type: Boolean,
      default: true, //true가 로그인 가능한 상태
    },
    failedLoginAttempts: {
      //비밀번호를 틀린 횟수
      type: Number,
      default: 0, //5회 이상 틀리면 계정 잠김
    },
    lastLoginAttempt: {
      //마지막 로그인 시간
      type: Date,
    },
    ipAddress: {
      //로그인 IP정보
      type: String,
      trim: true,
    },
    createdAt: {
      //가입일
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, //계정생성, 계정정보 업데이트된 시간도 자동으로 업데이트 여부
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User; //User정보를 외부로 내보낸다.