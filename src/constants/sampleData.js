import jash from "./jash.jpg"
import yash from "./yash.jpg"
import aayush from "./aayush.jpg"
export const samplechats = [
  {
    avatar: [jash],
    name: "Jash Mehta",
    _id: "1",
    groupChat: false,
    members: ["1", "2"],
  },
  {
    avatar: [yash],
    name: "Yash Jobalia",
    _id: "2",
    groupChat: false,
    members: ["1", "2"],
  },
  {
    avatar: [aayush],
    name: "Aayush Doshi",
    _id: "3",
    groupChat: false,
    members: ["1", "2"],
  },
];

export const sampleUsers = [
  {
    avatar: [jash],
    name: "Jash Mehta",
    _id: "1",
  },
  {
    avatar: "",
    name: "Yash Jobalia",
    _id: "2",
  }
];
export const sampleNotifications = [
  {
    sender:{
      avatar:"",
      name:"Jash Mehta"
    },
    _id:"1"
  },
  {
    sender:{
      avatar:"",
      name:"Aayush Doshi"
    },
    _id:"2"
  }
];

export const sampleMessage=[
{
  attachments:[
    {
      public_id:"1",
      url:""
    },

  ],
  content:"Kaise chal raha hai react project?",
  _id:"e03i9023",
  sender:{
    _id:"user._id",
    name:"Yash",

  },
  chat:"chatId",
  createdAt: "2024-06-02T10:15:30Z"
},
{
  attachments:[
    {
      public_id:"2",
      url:"https://www.w3schools.com/howto/img_avatar.png"
    },

  ],
  content:"Chal raha hai bass",
  _id:"e03i9023",
  sender:{
    _id:"340224",
    name:"Aayush",

  },
  chat:"chatId",
  createdAt: "2024-01-15T08:20:45Z"
}
]