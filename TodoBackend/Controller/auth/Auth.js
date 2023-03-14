const { Client, Account, ID } = require("node-appwrite");
// const { Client } = require('node-appwrite');
const { v4 } = require("uuid");
const ENDPOINT = process.env.APPWRITEENDPOINT;
const PROJECT = process.env.PROJECT;

const client = new Client().setEndpoint(`${ENDPOINT}`).setProject(`${PROJECT}`);

const account = new Account(client);

const uuid = v4;

const Signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const data = await account.create(uuid(), email, password, name);
    console.log(data);
    res.status(200).json({
      success: true,
      Message: "You have been registered",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      Message: "You can't register",
      Error: error,
    });
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please Provide the Email and password",
      email: !!email,
      password: !!password,
    });
  }

  try {
    const Login_Credintioal = await account.createEmailSession(email, password);
    res.status(200).json({ Login_Credintioal: Login_Credintioal });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "some error has been occured",
      Error: error,
    });
  }
};

const Profile = async (req, res) => {
  const getData = account.get();
  getData.then(
    function (response) {
      return res.status(200).json({
        success: true,
        Message: "Profile has been given",
        data: response,
      });
    },
    function (error) {
      return res.status(400).json({
        success: false,
        Message: "some error has been issued",
        error: error,
      });
    }
  );
};

module.exports = { Signup, Login, Profile };
