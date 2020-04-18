var env = process.env
global.fetch = require("node-fetch");
var aws = require('aws-sdk');

var aws_cognito = require('amazon-cognito-identity-js');


// ユーザープール設定
var user_pool = new aws_cognito.CognitoUserPool({
    UserPoolId : env.USER_POOL_ID,
    ClientId : env.CLIENT_ID
});

// ユーザー決定
const cognito_user = new aws_cognito.CognitoUser({
    Username: env.USER_NAME,
    Pool: user_pool,
});

// パスワードの設定
const authentication_details = new aws_cognito.AuthenticationDetails({
    Password: env.PASSWORD,
});

// ユーザープール／ユーザー／パスワードを使って認証
cognito_user.authenticateUser(authentication_details, {
    // 成功時
    onSuccess(result){
        //アクセストークン取得
        var accessToken = result.getAccessToken().getJwtToken();
        console.log(accessToken)  
    },
    onFailure(err){
        console.error(err);     
    },
});