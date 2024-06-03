// src/assets/index.ts

import { link } from "fs";
import bookSaved from "./emojis/book-saved.svg";
import briefcase from "./emojis/briefcase.svg";
import chart from "./emojis/chart.svg";
import edit from "./emojis/edit.svg";
import happy from "./emojis/happy.svg";
import likeDislike from "./emojis/like-dislike.svg";
import listen from "./emojis/math.svg";
import math from "./emojis/math.svg";
import messages from "./emojis/messages.svg";
import shapes from "./emojis/shapes.svg";
import userSquare from "./emojis/user-square.svg";

import bot from "./icons/bot.jpg";
import customerService from "./icons/customer-service.svg";
import deleteIcon from "./icons/delete.png";
import google from "./icons/google.svg";
import headerLogo from "./icons/header-logo.svg";
import history from "./icons/history.svg";
import home from "./icons/home.svg";
import linkedin from "./icons/linkedin.svg";
import logOut from "./icons/log-out.svg";
import mic from "./icons/mic.svg";
import profile1 from "./icons/profile-1.svg";
import profile from "./icons/profile.svg";
import report from "./icons/report.svg";
import trash from "./icons/trash.svg";

import communicationSkills from "./images/communication-skills.svg";
import evalHomePlaceholder from "./images/eval-home-placeholder.svg";
import evalSubmitted from "./images/eval-submitted.svg";
import homeImage from "./images/home.svg";
import hourglass from "./images/hourglass.svg";
import industryReady from "./images/industry-ready.svg";
import landing from "./images/landing.svg";
import placementSupport from "./images/placement-support.svg";
import psychometricAssessment from "./images/psychometric-assessment.svg";
import quantitativeAbility from "./images/quantitative-ability.svg";
import reportImage from "./images/report.svg";
import resultLeft from "./images/result-left.svg";
import resultMiddle from "./images/result-middle.svg";
import resultRight from "./images/result-right.svg";
import testConfirm from "./images/test-confirm.svg";
import testSkills from "./images/test-skills.svg";
import logoNew from './images/logo-clarified.png'

export const emojis: { [key: string]: string } = {
  edit,
  math,
  listen,
  "book-saved": bookSaved,
  briefcase,
  chart,
  happy,
  "like-dislike": likeDislike,
  messages,
  shapes,
  "user-square": userSquare,
};

export const icons = {
  bot,
  customerService,
  deleteIcon,
  google,
  headerLogo,
  history,
  home,
  linkedin,
  logOut,
  mic,
  profile1,
  profile,
  report,
  trash,
};

export const images = {
  communicationSkills,
  evalHomePlaceholder,
  evalSubmitted,
  homeImage,
  hourglass,
  industryReady,
  landing,
  placementSupport,
  psychometricAssessment,
  quantitativeAbility,
  reportImage,
  resultLeft,
  resultMiddle,
  resultRight,
  testConfirm,
  testSkills,
  logoNew
};
