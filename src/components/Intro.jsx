import React from "react";

// react-router-dom
import { Form } from "react-router-dom";

// libraries
import { UserPlusIcon } from "@heroicons/react/24/solid";

// assets
import illustration from "../assets/illustration1.svg";

const Intro = () => {
  return (
    <div className="intro">
      <div>
        <h1>
          Take control of <span className="accent">Your Money</span>
        </h1>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
        <Form method="post">
          <input type="text" name="userName" required placeholder="What is your name" aria-label="your name" autoComplete="given-name" />
          <button type="submit" className="btn">
            <span>Create account</span>
            <UserPlusIcon width={30}></UserPlusIcon>
          </button>
        </Form>
      </div>
      <img src={illustration} alt="illustration" />
    </div>
  );
};

export default Intro;
