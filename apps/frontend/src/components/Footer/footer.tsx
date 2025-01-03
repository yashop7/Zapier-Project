import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
// import BottomGradient  from "../SignupForm";

export const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};
import { Button } from "../ui/button";
import { Section } from "./craft";
const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

interface Profile {
  name: string;
  url: string;
}

interface social {
  [platform: string]: Profile[];
}
export type IconProps = React.HTMLAttributes<SVGElement>;

export const CustomIcons = {
  linkedin: (props: IconProps) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>LinkedIn</title>
      <path
        fill="currentColor"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    </svg>
  ),
  x: (props: IconProps) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>X</title>
      <path
        fill="currentColor"
        d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
      />
    </svg>
  ),
  github: (props: IconProps) => (
    <svg viewBox="0 0 438.549 438.549" {...props}>
      <path
        fill="currentColor"
        d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
      ></path>
    </svg>
  ),
  solana : (props : IconProps) => (
<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0,0,256,256" {...props}>
<defs><linearGradient x1="32" y1="17.936" x2="32" y2="43.068" gradientUnits="userSpaceOnUse" id="color-1_icTiMgoOHSVy_gr1"><stop offset="0" stopColor="#000000"></stop><stop offset="1" stopColor="#000000"></stop></linearGradient><linearGradient x1="32" y1="8.553" x2="32" y2="55.331" gradientUnits="userSpaceOnUse" id="color-2_icTiMgoOHSVy_gr2"><stop offset="0" stopColor="#ffffff"></stop><stop offset="1" stopColor="#ffffff"></stop></linearGradient></defs><g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{mixBlendMode: "normal"}}><g transform="scale(4,4)"><path d="M41.806,25h-24.774l5.161,-6h24.774zM17.032,45h24.774l5.161,-6h-24.773zM17.032,29l5.161,6h24.774l-5.161,-6z" fill="url(#color-1_icTiMgoOHSVy_gr1)"></path><path d="M32,58c-14.337,0 -26,-11.663 -26,-26c0,-14.336 11.663,-26 26,-26c14.337,0 26,11.664 26,26c0,14.337 -11.663,26 -26,26zM32,8c-13.233,0 -24,10.767 -24,24c0,13.233 10.767,24 24,24c13.233,0 24,-10.767 24,-24c0,-13.233 -10.767,-24 -24,-24z" fill="url(#color-2_icTiMgoOHSVy_gr2)"></path></g></g>
</svg>
  ),
  slack : (props : IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48" {...props}>
<path d="M44,21v-2h-0.424c-0.774-1.763-2.531-3-4.576-3s-3.802,1.237-4.576,3H34v-9c0-2.757-2.243-5-5-5s-5,2.243-5,5	c0-2.757-2.243-5-5-5c-2.045,0-3.802,1.237-4.576,3H14v2c0,2.045,1.237,3.802,3,4.576V15H8c-2.045,0-3.802,1.237-4.576,3H3v2	c0,2.414,1.721,4.434,4,4.899v0.23C5.404,25.454,4.096,26.549,3.447,28H3v2h0.002C3.002,30.008,3,30.014,3,30.022	c0,2.754,2.243,4.994,5,4.994s5-2.24,5-4.994V30h0.002c0,0.008-0.002,0.014-0.002,0.022v10.984C13,43.76,15.243,46,18,46	s5-2.24,5-4.994V41c0,2.757,2.243,5,5,5s5-2.243,5-5v-2h-0.424c-0.774-1.763-2.531-3-4.576-3h11c2.757,0,5-2.243,5-5v-2h-0.424	c-0.774-1.763-2.531-3-4.576-3C41.757,26,44,23.757,44,21z"></path><path fill="#fff" d="M33,8c0-2.209-1.791-4-4-4s-4,1.791-4,4c0,1.254,0,9.741,0,11c0,2.209,1.791,4,4,4s4-1.791,4-4	C33,17.741,33,9.254,33,8z"></path><path fill="#fff" d="M43,19c0,2.209-1.791,4-4,4c-1.195,0-4,0-4,0s0-2.986,0-4c0-2.209,1.791-4,4-4S43,16.791,43,19z"></path><path fill="#fff" d="M8,14c-2.209,0-4,1.791-4,4s1.791,4,4,4c1.254,0,9.741,0,11,0c2.209,0,4-1.791,4-4s-1.791-4-4-4	C17.741,14,9.254,14,8,14z"></path><path fill="#fff" d="M19,4c2.209,0,4,1.791,4,4c0,1.195,0,4,0,4s-2.986,0-4,0c-2.209,0-4-1.791-4-4S16.791,4,19,4z"></path><path fill="#fff" d="M14,39.006C14,41.212,15.791,43,18,43s4-1.788,4-3.994c0-1.252,0-9.727,0-10.984	c0-2.206-1.791-3.994-4-3.994s-4,1.788-4,3.994C14,29.279,14,37.754,14,39.006z"></path><path fill="#fff" d="M4,28.022c0-2.206,1.791-3.994,4-3.994c1.195,0,4,0,4,0s0,2.981,0,3.994c0,2.206-1.791,3.994-4,3.994	S4,30.228,4,28.022z"></path><path fill="#fff" d="M39,33c2.209,0,4-1.791,4-4s-1.791-4-4-4c-1.254,0-9.741,0-11,0c-2.209,0-4,1.791-4,4s1.791,4,4,4	C29.258,33,37.746,33,39,33z"></path><path fill="#fff" d="M28,43c-2.209,0-4-1.791-4-4c0-1.195,0-4,0-4s2.986,0,4,0c2.209,0,4,1.791,4,4S30.209,43,28,43z"></path><path d="M29,24c-2.757,0-5-2.243-5-5V8c0-2.757,2.243-5,5-5s5,2.243,5,5v11C34,21.757,31.757,24,29,24z M29,5c-1.654,0-3,1.346-3,3	v11c0,1.654,1.346,3,3,3s3-1.346,3-3V8C32,6.346,30.654,5,29,5z"></path><path d="M39,24h-4c-0.553,0-1-0.448-1-1v-4c0-2.757,2.243-5,5-5s5,2.243,5,5S41.757,24,39,24z M36,22h3c1.654,0,3-1.346,3-3	s-1.346-3-3-3s-3,1.346-3,3V22z"></path><path d="M19,23H8c-2.757,0-5-2.243-5-5s2.243-5,5-5h11c2.757,0,5,2.243,5,5S21.757,23,19,23z M8,15c-1.654,0-3,1.346-3,3	s1.346,3,3,3h11c1.654,0,3-1.346,3-3s-1.346-3-3-3H8z"></path><path d="M23,13h-4c-2.757,0-5-2.243-5-5s2.243-5,5-5s5,2.243,5,5v4C24,12.552,23.553,13,23,13z M19,5c-1.654,0-3,1.346-3,3	s1.346,3,3,3h3V8C22,6.346,20.654,5,19,5z"></path><path d="M18,44c-2.757,0-5-2.24-5-4.994V28.022c0-2.754,2.243-4.994,5-4.994s5,2.24,5,4.994v10.984C23,41.76,20.757,44,18,44z M18,25.028c-1.654,0-3,1.343-3,2.994v10.984C15,40.657,16.346,42,18,42s3-1.343,3-2.994V28.022C21,26.371,19.654,25.028,18,25.028z"></path><path d="M8,33.016c-2.757,0-5-2.24-5-4.994s2.243-4.994,5-4.994h4c0.553,0,1,0.448,1,1v3.994C13,30.776,10.757,33.016,8,33.016z M8,25.028c-1.654,0-3,1.343-3,2.994s1.346,2.994,3,2.994s3-1.343,3-2.994v-2.994H8z"></path><path d="M39,34H28c-2.757,0-5-2.243-5-5s2.243-5,5-5h11c2.757,0,5,2.243,5,5S41.757,34,39,34z M28,26c-1.654,0-3,1.346-3,3	s1.346,3,3,3h11c1.654,0,3-1.346,3-3s-1.346-3-3-3H28z"></path><path d="M28,44c-2.757,0-5-2.243-5-5v-4c0-0.552,0.447-1,1-1h4c2.757,0,5,2.243,5,5S30.757,44,28,44z M25,36v3c0,1.654,1.346,3,3,3	s3-1.346,3-3s-1.346-3-3-3H25z"></path>
</svg>
  ),
  gmail : (props : IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48" {...props}>
<path d="M39.285,11c-1.052,0-2.086,0.357-2.913,1.008L24,21.729l-12.372-9.721C10.802,11.358,9.768,11,8.715,11	C6.115,11,4,13.115,4,15.715V38c0,1.654,1.346,3,3,3h7c0.552,0,1-0.447,1-1V27.113l8.377,6.669c0.364,0.29,0.878,0.291,1.243,0.003	L33,27.169V40c0,0.553,0.448,1,1,1h7c1.654,0,3-1.346,3-3V15.715C44,13.115,41.885,11,39.285,11z"></path><path fill="#fff" d="M36.99,10.794L24,21L11.01,10.794C10.356,10.28,9.548,10,8.715,10h0C6.663,10,5,11.663,5,13.715v2.16	V36c0,1.105,0.895,2,2,2h7V23.039L24,31l10-7.895V38h7c1.105,0,2-0.895,2-2V16v-2.285C43,11.663,41.337,10,39.285,10h0	C38.452,10,37.644,10.28,36.99,10.794z"></path><path d="M41,39h-7c-0.552,0-1-0.447-1-1V25.169l-8.38,6.616c-0.364,0.288-0.878,0.287-1.243-0.003L15,25.113V38c0,0.553-0.448,1-1,1	H7c-1.654,0-3-1.346-3-3V13.715C4,11.115,6.115,9,8.715,9c1.053,0,2.087,0.358,2.914,1.008L24,19.729l12.372-9.721	C37.198,9.357,38.232,9,39.285,9C41.885,9,44,11.115,44,13.715V36C44,37.654,42.654,39,41,39z M35,37h6c0.551,0,1-0.448,1-1V13.715	C42,12.218,40.782,11,39.285,11c-0.606,0-1.202,0.206-1.677,0.58c0,0,0,0,0,0l-12.99,10.206c-0.362,0.285-0.873,0.285-1.235,0	L10.393,11.58C9.917,11.206,9.321,11,8.715,11C7.218,11,6,12.218,6,13.715V36c0,0.552,0.449,1,1,1h6V23.039	c0-0.384,0.22-0.734,0.566-0.9c0.345-0.168,0.756-0.12,1.057,0.118l9.379,7.467l9.378-7.403c0.301-0.237,0.711-0.281,1.056-0.114	S35,22.723,35,23.105V37z M36.99,10.794H37H36.99z"></path><path d="M24,32c-0.22,0-0.44-0.072-0.623-0.218l-19-15.125c-0.432-0.344-0.503-0.973-0.159-1.405	c0.344-0.432,0.973-0.503,1.405-0.159l18.379,14.631L42.38,15.215c0.434-0.341,1.063-0.269,1.404,0.165	c0.342,0.434,0.269,1.063-0.165,1.405l-19,15C24.438,31.929,24.219,32,24,32z"></path><rect width="2" height="13" x="13" y="13"></rect><rect width="2" height="13" x="33" y="13"></rect>
</svg>
  )
};

const SocialMedia: social = {
  github: [
 
    {
      name: "Yash",
      url: "https://github.com/yashop7",
    },
  ],
  linkedin: [

    {
      name: "Yash",
      url: "https://www.linkedin.com/in/yash-gussian-462611299/",
    },
  ],
  x: [

    {
      name: "Yash",
      url: "https://x.com/YASH25764536",
    },
  ],
};
export default function Footer() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
  }

  return (
    <Section className=" rounded-tl-lg bg-white rounded-tr-lg border-black px-2 pb-2 pl-4 pt-2 dark:border-white dark:bg-black opacity-95 md:pb-0">
      <div className=" gap-2 md:gap-4 border dark:border-0 inline-block p-3 rounded-lg shadow-md  ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="not-prose md:flex space-x-2 space-y-2"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold md:text-base opacity-85">
                    Contact us, If you like this project
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="my-2  md:max-w-screen-4xl "
                      placeholder="example@fjord.dev"
                      {...field}
                    />
                  </FormControl>
                  {/* <FormDescription>
                      Lorem ipsum dolor sit amet.
                    </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              variant="gooeyLeft"
              className="group/btn place-self-end  relative bg-black dark:bg-white dark:text-black text-white dark:shadow-[0px_0px_1px_1px_var(--neutral-800)] md:h-9 md:px-4 md:py-2"
              size={"sm"}
            >
              Submit
              <BottomGradient />
            </Button>
          </form>
        </Form>
      </div>
      <hr className="mb-2 mt-2" />
      <div className="not-prose flex items-center justify-between text-xs dark:text-neutral-300 md:mb-3 md:flex md:text-sm">
        <div>
          <p className="text-muted-foreground">
            ©{" "}
            <a
              href="https://github.com/Rithvickkr/skizify"
              className="hover:underline"
            >
              Floley
            </a>
            . All rights reserved. 2024-present.
          </p>
        </div>
        <div className="flex gap-2">
          {renderDropdown("github", CustomIcons.github)}
          {renderDropdown("linkedin", CustomIcons.linkedin)}
          {renderDropdown("x", CustomIcons.x)}
        </div>
      </div>
    </Section>
  );
}

const renderDropdown = (
  platform: string,
  Icon: React.ComponentType<IconProps>,
) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        variant="outline"
        size="icon"
        className="group/btn relative size-7 bg-transparent opacity-70 transition-shadow duration-300 hover:opacity-100 hover:shadow-md dark:border-0 dark:bg-black dark:shadow-[0px_0px_1px_1px_var(--neutral-800)] md:size-10"
      >
        <Icon className="size-4 md:size-6" />
        <BottomGradient />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-36 bg-white dark:bg-black">
      <DropdownMenuGroup className="">
        {SocialMedia[platform]?.map((profile,index) => {
          return (
            <DropdownMenuItem
              className="m-1 cursor-pointer rounded-md bg-mediumdark text-white hover:bg-lightdark"
              onClick={() => window.open(profile.url, "_blank")}
              key={index}
            >
              <Icon className="mr-2 h-5 w-5" />
              <DropdownMenuShortcut>{profile.name}</DropdownMenuShortcut>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
);
