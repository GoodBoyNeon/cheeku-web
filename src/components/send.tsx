"use client";

import { Textarea } from "@/components/ui/textarea";
import { SendButton } from "./send-button";
import { Toaster } from "./ui/sonner";
import { send } from "@/app/actions";
import { toast } from "sonner";
import { Input } from "./custom-ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import SyntaxHighlighter from "react-syntax-highlighter";

import { atomOneDark as theme } from "react-syntax-highlighter/dist/esm/styles/hljs";

const example = `[
  {
    "title": "Example Embed 1",
    "description": "This is an example embed!",
    "author": { "name": "Author", "url": "https://example.com" },
    "color": 2664261
  },
  {
    "title": "Example Embed 2",
    "description": "This is another example embed!",
    "footer": { "text": "This is the footer text" },
    "color": 5727730
  }
]
`;

export async function Send() {
  return (
    <div className="max-w-3xl w-full space-y-4">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">New Announcement Message</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your message below and click send to post it to
          no-ping-annoucements channel.
        </p>
      </div>
      <div className="space-y-4">
        <form
          className="space-y-4"
          action={async (formData) => {
            const success = await send(formData);
            if (success)
              toast("Message Sent!", {
                description:
                  "Your message was successfully sent to annoucement channel.",
              });
            else
              toast("An error occured!", {
                description: "Your message could not be sent!",
              });
          }}
        >
          <Textarea
            name="message"
            className="min-h-[200px]"
            placeholder="Enter your message here."
          />
          <Input name="embed-json" placeholder="Embed JSON(s) (optional)" />
          <SendButton />
        </form>
        <div>
          <Accordion type="single" collapsible>
            <AccordionItem value="item">
              <AccordionTrigger>How to use Embed JSON Field?</AccordionTrigger>
              <AccordionContent>
                Put an array of embed(s) JSON value in the input field. Example:
                <SyntaxHighlighter
                  language="JSON"
                  style={theme}
                  customStyle={{ borderRadius: "0.5rem" }}
                >
                  {example}
                </SyntaxHighlighter>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        {/* <div className="space-y-2"> */}
        {/*   <p className="text-sm font-medium tracking-wide uppercase text-gray-500 dark:text-gray-400"> */}
        {/*     Preview */}
        {/*   </p> */}
        {/*   <div className="prose max-w-none"> */}
        {/*     <p> */}
        {/*       This is some text. This text is bold. This text is italic. This is */}
        {/*       some inline code. This is a link. */}
        {/*     </p> */}
        {/*   </div> */}
        {/* </div> */}
      </div>
      <Toaster />
    </div>
  );
}
