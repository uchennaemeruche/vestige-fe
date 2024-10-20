import {
  Copyright,
  Github,
  GithubIcon,
  LinkedinIcon,
  MenuIcon,
  TwitterIcon,
  X,
} from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import RFeeder from "feeder-react-feedback";
import "feeder-react-feedback/dist/feeder-react-feedback.css";
import { useState } from "react";

import DemoScreenshot from "./assets/demo-screenshot.png";
import UptimerLogo from "./assets/uptimer-logo.png";
import VestigeLogo from "./assets/Vestige.png";
import { Link } from "react-router-dom";

const ReactFeedback = RFeeder.default ? RFeeder.default : RFeeder;

// Color Code : #08C551
export const NavBar = () => {
  const [openNav, setopenNav] = useState(true);

  const toggleNav = () => {
    setopenNav(!openNav);
  };

  return (
    <nav className="flex justify-between items-center h-24 dark:text-white ">
      <h1 className="w-full text-3xl font-bold text-[#08C551]">
        {/* <Link to="/">Uptimer.</Link> */}
        <img src={VestigeLogo} alt="Vestige logo" className=" h-14" />
      </h1>
      <ul className="hidden md:flex items-center">
        <a
          target="_blank"
          href="https://github.com/uchennaemeruche"
          className="flex p-4 space-x-1"
        >
          <Github />
          <span>Github</span>
        </a>
        {/* <li className="flex p-4 space-x-1 ">
          <ViewIcon />
          <span>Demo</span>
        </li> */}
        {/* <a className="flex items-center px-1 w-24 h-10 justify-center rounded bg-gray-100 text-[#00df9a] font-semibold">
          Get Started
        </a> */}

        <Link to="/dashboard">
          <button className="bg-[#08C551] w-[130px] rounded-md font-medium my-6 py-2 text-black hover:bg-[#00df9a]">
            Get Started
          </button>
        </Link>
      </ul>
      <div onClick={toggleNav} className="block md:hidden">
        {!openNav ? <X size={20} /> : <MenuIcon size={20} />}
      </div>
      <div
        className={
          !openNav
            ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-white ease-in-out duration-500"
            : "fixed left-[-100%]"
        }
      >
        <h1 className="w-full text-3xl font-bold text-[#00df9a] m-4 text-center">
          {/* <Link to="/">Uptimer.</Link> */}
          <img src={UptimerLogo} alt="" className=" h-14" />
        </h1>
        <ul className="p-1 uppercase flex flex-col items-center">
          <a
            target="_blank"
            href="https://github.com/uchennaemeruche"
            className="flex p-4 space-x-1"
          >
            <Github />
            <span>Github</span>
          </a>
          {/* <li className="flex p-4 space-x-1">
            <ViewIcon />
            <span>Demo</span>
          </li> */}
          {/* <a className="flex items-center px-1 w-24 h-10 justify-center rounded bg-gray-100 text-[#00df9a] font-semibold">
          Get Started
        </a> */}

          <Link to="/dashboard">
            {" "}
            <button className="border-[#00df9a] w-[130px] border rounded-md font-medium my-6 py-2 text-gray-800">
              Get Started
            </button>
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export const HeroSection = () => {
  return (
    <section className="w-full dark:text-white">
      <div className=" mt-[-96px] w-full h-screen text-center flex flex-col justify-center ">
        <p className=" text-[#00df9a] font-bold p-2">
          Ensure Your Website's Reliability 24/7
        </p>
        <h1 className="text-4xl sm:text-6xl md:text-6xl font-bold py-4 ">
          Stay Ahead of Downtime with Uptimer - The Uptime Monitoring tool
        </h1>
        <div>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold py-3 ">
            <span className="pr-1"> Never Miss a Beat with our: </span>
            <TypeAnimation
              sequence={[
                "Realtime App Monitoring",
                1000,
                "Instant Notification",
                1000,
                "Performace Insight",
                1000,
                "Multiple Checkpoints",
                1000,
                "User-Friendly Dashboard",
                1000,
              ]}
              wrapper="span"
              speed={{ type: "keyStrokeDelayInMs", value: 250 }}
              //   speed={1}
              //   style={{ fontSize: "1.7em", display: "inline-block" }}
              repeat={Infinity}
            />
          </p>
        </div>
        <p className="text-xl md:2xl font-bold text-gray-500">
          Introducing the ultimate solution to your uptime worries – Uptimer!
        </p>

        {/* Monitor > Notify > Monitor! */}

        <Link to="/dashboard">
          <button className="bg-[#08C551] hover:bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black">
            Get Started
          </button>
        </Link>
      </div>
    </section>
  );
};

export const GridSection = () => {
  return (
    <section className="w-full bg-white py-16 px-4">
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
        <div className="flex flex-col justify-center">
          {/* <p className="text-[#00df9a] font-bold">Analytics Dashboard</p> */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold py-2">
            Monitor everything at o nce
          </h1>
          <p className="">
            Is your website or web service experiencing downtime without you
            even knowing it? Don't let a minute of inaccessibility cost you
            customers, opportunities, or your hard-earned reputation.
            Introducing the ultimate solution to your uptime worries – Uptimer:
            Monitor &gt; Notify &gt; Aggregate.
          </p>

          <Link to="/dashboard">
            <button className=" bg-[#08C551] hover:bg-[#00df9a] w-[200px] rounded-md font-medium my-6 py-3 text-black">
              Get Started
            </button>
          </Link>
        </div>
        <img
          className="w-[500px] mx-auto my-4"
          src={DemoScreenshot}
          alt="Demo Screenshot"
        />
      </div>
    </section>
  );
};

export const AnimatedFeatureSection = () => {
  return (
    <section className="w-full bg-white px-4 pb-80 pt-80">
      <div className="w-full flex mx-auto items-center justify-center relative">
        <div className="p-5 z-40 bg-white">
          <h1 className="w-full text-4xl sm:text-6xl font-bold text-[#00df9a]">
            Uptimer.
          </h1>
        </div>

        <div className="absolute top-40 left-[350px] w-[300px] shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
          <h2 className="text-2xl font-bold py-2">Realtime Monitoring 1</h2>
          <p className="font-medium text-sm">
            Stay ahead of the game with our real-time website and web service
            monitoring. We check the availability around the clock, so you don't
            have to.
          </p>
          <button className="text-center rounded-md font-medium my-6 py-3 text-black">
            Explore!
          </button>
        </div>
        <div className="absolute right-[120px] top-20  w-[300px] shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
          <h2 className="text-2xl font-bold py-2">Realtime Monitoring 2</h2>
          <p className="font-medium text-sm">
            Stay ahead of the game with our real-time website and web service
            monitoring. We check the availability around the clock, so you don't
            have to.
          </p>
          <button className="text-center rounded-md font-medium my-6 py-3 text-black">
            Explore!
          </button>
        </div>
        <div className="absolute left-10  w-[300px] shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
          <h2 className="text-2xl font-bold py-2">Realtime Monitoring 3</h2>
          <p className="font-medium text-sm">
            Stay ahead of the game with our real-time website and web service
            monitoring. We check the availability around the clock, so you don't
            have to.
          </p>
          <button className="text-center rounded-md font-medium my-6 py-3 text-black">
            Explore!
          </button>
        </div>
        <div className="absolute bottom-40  w-[300px] shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
          <h2 className="text-2xl font-bold py-2">Realtime Monitoring 4 </h2>
          <p className="font-medium text-sm">
            Stay ahead of the game with our real-time website and web service
            monitoring. We check the availability around the clock, so you don't
            have to.
          </p>
          <button className="text-center rounded-md font-medium my-6 py-3 text-black">
            Explore!
          </button>
        </div>

        <div className="absolute bottom-20 right-10 w-[300px] shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
          <h2 className="text-2xl font-bold py-2">Realtime Monitoring 5</h2>
          <p className="font-medium text-sm">
            Stay ahead of the game with our real-time website and web service
            monitoring. We check the availability around the clock, so you don't
            have to.
          </p>
          <button className="text-center rounded-md font-medium my-6 py-3 text-black">
            Explore!
          </button>
        </div>
      </div>
    </section>
  );
};

export const FeatureSection = () => {
  return (
    <section className="w-full bg-white px-4">
      <h1 className="text-4xl sm:text-6xl md:text-6xl font-bold text-center">
        Features
      </h1>

      <div className="max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8 mt-4">
        <div className="w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
          <h2 className="text-2xl font-bold py-2">Realtime Monitoring</h2>
          <p className="font-medium text-sm">
            Stay ahead of the game with our real-time website and web service
            monitoring. We check the availability around the clock, so you don't
            have to.
          </p>
          <button className="text-left rounded-md font-medium my-6 py-3 text-black">
            Explore!
          </button>
        </div>
        <div className="w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
          <h2 className="text-2xl font-bold py-2">Instant Notifications</h2>
          <p className="font-medium text-sm">
            Receive instant alerts through email, SMS, or our mobile app
            whenever downtime is detected. Take action before it affects your
            users.
          </p>
          <button className="w-[200px] rounded-md font-medium my-6 py-3 text-black">
            Explore!
          </button>
        </div>
        <div className="w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
          <h2 className="text-2xl font-bold py-2">Performance Insight</h2>
          <p className="font-medium text-sm">
            Track the uptime and downtime history of your website or service.
            Spot trends, analyze performance, and make informed decisions.
          </p>
          <button className="w-[200px] rounded-md font-medium my-6 py-3 text-black">
            Explore!
          </button>
        </div>

        <div className="w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
          <h2 className="text-2xl font-bold py-2">
            Global Accessibility/Multiple Checkpoints
          </h2>
          <p className="font-medium text-sm">
            Our global network of monitoring checkpoints ensures comprehensive
            coverage. Know how your site performs from different parts of the
            world.
          </p>
          <button className="w-[200px] rounded-md font-medium my-6 py-3 text-black">
            Coming soon
          </button>
        </div>
        <div className="w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
          <h2 className="text-2xl font-bold py-2">User-Friendly Dashboard:</h2>
          <p className="font-medium text-sm">
            Our intuitive dashboard provides a clear overview of your website's
            health. It's easy to use, even for non-technical users.
          </p>
          <button className="w-[200px] rounded-md font-medium my-6 py-3 text-black">
            Explore Now
          </button>
        </div>
      </div>
    </section>
  );
};

export const NewsLetter = () => {
  return (
    <section className="w-full py-16 px-4 dark:text-white">
      <div className="max-w-[1240px] mx-auto grid lg:grid-cols-3 items-center">
        <div className="lg:col-span-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold py-2">
            Want to get notified when we ship new features?
          </h1>
          <p>Subscribe to our newsletter and stay up to date.</p>
        </div>
        <div className="my-4">
          <div className="flex flex-col md:flex-row items-center ">
            <input
              className="py-3 rounded-l-md px-3 text-gray-800 h-14 w-full md:min-w-[250px] "
              type="email"
              placeholder="Enter email"
            />
            <button className="bg-[#08C551] hover:bg-[#00df9a] text-gray-800 w-full md:w-[200px] rounded-md md:rounded-none md:rounded-r-md font-medium my-2 md:my-6 px-6 py-3 h-14">
              Subscribe
            </button>
          </div>
        </div>
        <div></div>
      </div>
    </section>
  );
};

export const Footer = () => {
  return (
    <footer className="py-16 w-full grid grid-flow-col lg:grid-col-3 gap-8 bg-white dark:text-gray-300">
      <div>
        {/* <h1 className="w-full text-3xl font-bold text-[#00df9a]">Uptimer.</h1> */}
        <img src={UptimerLogo} alt="" className=" h-10" />
        <p className="py-2">
          Don't let downtime hold you back. Join the Uptime Monitor community
          and keep your website always online!
        </p>
        <p className="flex">
          <Copyright />
          <span className="px-1  text-gray-500">
            {new Date().getFullYear()} Uptimer. All rights reserved.
          </span>
        </p>
        <div className="flex space-x-4 my-3 ">
          <Link to={`https://github.com/uchennaemeruche`} target="_blank">
            <GithubIcon size={30} />
          </Link>
          <Link
            to={`https://www.linkedin.com/in/uchenna-emeruche-584332164/`}
            target="_blank"
          >
            <LinkedinIcon size={30} />
          </Link>
          <Link to={`https://twitter.com/EmerucheUchenna`} target="_blank">
            <TwitterIcon size={30} />
          </Link>
        </div>
      </div>
      {/* <div className="lg:col-span-3 flex justify-between items-center">
        <div className="">
          <ul>
            <li className="py-2 text-sm">Demo</li>
            <li>
              <Link to="/status" className="py-2 text-sm">
                Status Page
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="py-2 text-sm">
                Getting Started
              </Link>{" "}
            </li>
          </ul>
        </div>
      </div> */}
    </footer>
  );
};

export const Home = () => {
  return (
    <main className="max-w-[1240px] mx-auto px-4">
      <NavBar />
      <HeroSection />
      <GridSection />
      {/* <AnimatedFeatureSection/> */}
      <FeatureSection />
      <NewsLetter />
      <ReactFeedback
        projectId={import.meta.env.VITE_FEEDER_PROJECT_ID}
        email={true}
        projectName="Uptime Monitor"
        postSubmitButtonMsg="We've received your feedback. Thank you. "
      />
      <Footer />
    </main>
  );
};
// export default Home;
