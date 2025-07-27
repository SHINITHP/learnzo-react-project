import { HelpCircle, Plus, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CourseFAQ = () => {
  const faqs = [
    {
      question: "How long do I have access to the course?",
      answer:
        "You get lifetime access to the course materials, including all future updates. Once you enroll, you can learn at your own pace and revisit the content whenever you need to.",
    },
    {
      question: "Is this course suitable for beginners?",
      answer:
        "Yes! This course is designed to take you from complete beginner to advanced level. We start with the fundamentals and gradually build up to more complex concepts with plenty of hands-on projects.",
    },
    {
      question: "Do I get a certificate upon completion?",
      answer:
        "Absolutely! You'll receive a certificate of completion that you can add to your LinkedIn profile, resume, or portfolio. The certificate includes verification and shows the skills you've mastered.",
    },
    {
      question: "What if I'm not satisfied with the course?",
      answer:
        "We offer a 30-day money-back guarantee. If you're not completely satisfied with the course within the first 30 days, we'll provide a full refund, no questions asked.",
    },
    {
      question: "Can I download the course videos?",
      answer:
        "Yes, all video lessons are available for download so you can learn offline. You'll also get downloadable resources, code files, and project assets to support your learning.",
    },
    {
      question: "How often is the course content updated?",
      answer:
        "We regularly update the course content to keep up with the latest industry trends and best practices. All updates are included free of charge for lifetime access students.",
    },
    {
      question: "Is there any prerequisite knowledge required?",
      answer:
        "No specific prerequisites are required. Basic computer literacy and familiarity with using a web browser is helpful, but we'll guide you through everything step by step.",
    },
    {
      question: "Can I get help if I'm stuck?",
      answer:
        "Yes! You get access to our student community, Q&A section, and direct instructor support. We're committed to helping you succeed throughout your learning journey.",
    },
  ];

  return (
    <div className="pl-3 pr-3 sm:pl-6 sm:pr-6 lg:pl-6 lg:pr-6 xl:pl-16 xl:pr-16 py-32 ">
      <Card className="shadow-card border-0 bg-transparent">
        <CardContent className="p-0">
          <div className="">
            {/* Header */}
            <div className="text-center mb-14">
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <HelpCircle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">
                  Frequently Asked Questions
                </h3>
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Got questions? We've got answers! Here are the most common
                questions about this course.
              </p>
            </div>

            {/* FAQ Accordion */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              {faqs.map((faq, index) => (
                <div className="border border-border rounded-xl overflow-hidden hover:shadow-elegant transition-all duration-300">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className=""
                    >
                      <AccordionTrigger className="px-6 py-4 hover:bg-muted/30 transition-colors [&[data-state=open]]:bg-muted/50">
                        <div className="flex items-center gap-4 text-left">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-primary font-semibold text-sm">
                              {index + 1}
                            </span>
                          </div>
                          <span className="font-semibold">{faq.question}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4 bg-muted/50">
                        <div className="ml-12 text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              ))}
            </div>

            {/* Still have questions section */}
            <div className="text-center bg-gradient-primary p-6 rounded-xl space-y-4">
              <h4 className="font-semibold text-xl text-white">Still have questions?</h4>
              <p className="text-white/90 max-w-2xl mx-auto">
                Can't find the answer you're looking for? Get in touch with our
                support team.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                  Contact Support
                </button>
                <button className="px-4 py-2 border text-white hover:text-[#2F4021] border-border rounded-lg hover:bg-muted/50 transition-colors">
                  Join Community
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseFAQ;
