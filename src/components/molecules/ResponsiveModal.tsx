import * as React from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "../hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LabelWithContentScroll } from "./LabelWithContentScroll";
import { LessonCard } from "../atoms/LessonCard";
import { Divider } from "../atoms/Divider";
import { useRouter } from "next/navigation";

const items = [
  { label: "အားလုံး", value: "all", isActive: true },
  { label: "ကိုယ်ဝန်ဆောင်ကျန်းမာရေး", value: "pregnancy" },
  { label: "မွေးကင်းစကလေးနှင့် သန့်ရှင်းရေး", value: "newborn" },
  { label: "မိခင်နို့တိုက်ကျွေးခြင်း", value: "breastfeeding" },
  { label: "မိခင်နို့တိုက်ကျွေးခြင်း", value: "breastfeeding" },
  { label: "မိခင်နို့တိုက်ကျွေးခြင်း", value: "breastfeeding" },
];

export function ResponsiveModal(props: any) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const router = useRouter();
  const onButtonClick = (module_id: string) => {
    router.push(`/${module_id}`);
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{props.children}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px] p-[var(--core-spacing-lg)]">
          <div className="w-full overflow-x-hidden py-1">
            <LabelWithContentScroll
              label="ဘာသာရပ်များ"
              items={items}
              onChipClick={(value) => console.log("Clicked:", value)}
              className="w-full max-w-full overflow-x-hidden"
            />
          </div>
          <div className="max-h-[80dvh] overflow-y-auto">
            <div className="space-y-[var(--core-spacing-md)] pb-4">
              <LessonCard
                title="ကိုယ်ဝန်ဆောင်ကျန်းမာရေး"
                description="ဆည်းလည်းလေးကို ကျန်းကျန်းမာမာနဲ့ ဖွားမြင်နိုင်ဖို့ဆို ဆည်းလည်းလေးရဲ့ မေမေကျန်းမာရေးနဲ့ ပတ်သက်တာတွေကို သင်ယူကြရအောင်နော်။"
                totalLessons="၆"
                state="progress"
                completedLessons="၂"
                progressValue={40}
              />
              <Divider className="my-0" />
            </div>
            <div className="space-y-[var(--core-spacing-md)] pb-4">
              <LessonCard
                title="ကိုယ်ဝန်ဆောင်ကျန်းမာရေး"
                description="ဆည်းလည်းလေးကို ကျန်းကျန်းမာမာနဲ့ ဖွားမြင်နိုင်ဖို့ဆို ဆည်းလည်းလေးရဲ့ မေမေကျန်းမာရေးနဲ့ ပတ်သက်တာတွေကို သင်ယူကြရအောင်နော်။"
                totalLessons="၆"
                state="default"
                onButtonClick={() => onButtonClick("23")}
              />
              <LessonCard
                title="ကိုယ်ဝန်ဆောင်ကျန်းမာရေး"
                description="ဆည်းလည်းလေးကို ကျန်းကျန်းမာမာနဲ့ ဖွားမြင်နိုင်ဖို့ဆို ဆည်းလည်းလေးရဲ့ မေမေကျန်းမာရေးနဲ့ ပတ်သက်တာတွေကို သင်ယူကြရအောင်နော်။"
                totalLessons="၆"
                state="default"
              />
              <LessonCard
                title="ကိုယ်ဝန်ဆောင်ကျန်းမာရေး"
                description="ဆည်းလည်းလေးကို ကျန်းကျန်းမာမာနဲ့ ဖွားမြင်နိုင်ဖို့ဆို ဆည်းလည်းလေးရဲ့ မေမေကျန်းမာရေးနဲ့ ပတ်သက်တာတွေကို သင်ယူကြရအောင်နော်။"
                totalLessons="၆"
                state="default"
              />
              <LessonCard
                title="ကိုယ်ဝန်ဆောင်ကျန်းမာရေး"
                description="ဆည်းလည်းလေးကို ကျန်းကျန်းမာမာနဲ့ ဖွားမြင်နိုင်ဖို့ဆို ဆည်းလည်းလေးရဲ့ မေမေကျန်းမာရေးနဲ့ ပတ်သက်တာတွေကို သင်ယူကြရအောင်နော်။"
                totalLessons="၆"
                state="default"
              />
              <LessonCard
                title="ကိုယ်ဝန်ဆောင်ကျန်းမာရေး"
                description="ဆည်းလည်းလေးကို ကျန်းကျန်းမာမာနဲ့ ဖွားမြင်နိုင်ဖို့ဆို ဆည်းလည်းလေးရဲ့ မေမေကျန်းမာရေးနဲ့ ပတ်သက်တာတွေကို သင်ယူကြရအောင်နော်။"
                totalLessons="၆"
                state="default"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{props.children}</DrawerTrigger>
      <DrawerContent className="px-[var(--core-spacing-lg)]">
        <div className="w-full overflow-x-hidden py-2">
          <LabelWithContentScroll
            label="ဘာသာရပ်များ"
            items={items}
            onChipClick={(value) => console.log("Clicked:", value)}
            className="w-full max-w-full overflow-x-hidden"
          />
        </div>
        <div className="max-h-[80dvh] overflow-y-auto">
          <div className="space-y-[var(--core-spacing-md)] pb-4">
            <LessonCard
              title="ကိုယ်ဝန်ဆောင်ကျန်းမာရေး"
              description="ဆည်းလည်းလေးကို ကျန်းကျန်းမာမာနဲ့ ဖွားမြင်နိုင်ဖို့ဆို ဆည်းလည်းလေးရဲ့ မေမေကျန်းမာရေးနဲ့ ပတ်သက်တာတွေကို သင်ယူကြရအောင်နော်။"
              totalLessons="၆"
              state="progress"
              completedLessons="၂"
              progressValue={40}
            />
            <Divider className="my-0" />
          </div>
          <div className="space-y-[var(--core-spacing-md)] pb-4">
            <LessonCard
              title="ကိုယ်ဝန်ဆောင်ကျန်းမာရေး"
              description="ဆည်းလည်းလေးကို ကျန်းကျန်းမာမာနဲ့ ဖွားမြင်နိုင်ဖို့ဆို ဆည်းလည်းလေးရဲ့ မေမေကျန်းမာရေးနဲ့ ပတ်သက်တာတွေကို သင်ယူကြရအောင်နော်။"
              totalLessons="၆"
              state="default"
              onButtonClick={() => onButtonClick("23")}
            />
            <LessonCard
              title="ကိုယ်ဝန်ဆောင်ကျန်းမာရေး"
              description="ဆည်းလည်းလေးကို ကျန်းကျန်းမာမာနဲ့ ဖွားမြင်နိုင်ဖို့ဆို ဆည်းလည်းလေးရဲ့ မေမေကျန်းမာရေးနဲ့ ပတ်သက်တာတွေကို သင်ယူကြရအောင်နော်။"
              totalLessons="၆"
              state="default"
            />
            <LessonCard
              title="ကိုယ်ဝန်ဆောင်ကျန်းမာရေး"
              description="ဆည်းလည်းလေးကို ကျန်းကျန်းမာမာနဲ့ ဖွားမြင်နိုင်ဖို့ဆို ဆည်းလည်းလေးရဲ့ မေမေကျန်းမာရေးနဲ့ ပတ်သက်တာတွေကို သင်ယူကြရအောင်နော်။"
              totalLessons="၆"
              state="default"
            />
            <LessonCard
              title="ကိုယ်ဝန်ဆောင်ကျန်းမာရေး"
              description="ဆည်းလည်းလေးကို ကျန်းကျန်းမာမာနဲ့ ဖွားမြင်နိုင်ဖို့ဆို ဆည်းလည်းလေးရဲ့ မေမေကျန်းမာရေးနဲ့ ပတ်သက်တာတွေကို သင်ယူကြရအောင်နော်။"
              totalLessons="၆"
              state="default"
            />
            <LessonCard
              title="ကိုယ်ဝန်ဆောင်ကျန်းမာရေး"
              description="ဆည်းလည်းလေးကို ကျန်းကျန်းမာမာနဲ့ ဖွားမြင်နိုင်ဖို့ဆို ဆည်းလည်းလေးရဲ့ မေမေကျန်းမာရေးနဲ့ ပတ်သက်တာတွေကို သင်ယူကြရအောင်နော်။"
              totalLessons="၆"
              state="default"
            />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function ProfileForm({ className }: React.ComponentProps<"form">) {
  return (
    <form className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" defaultValue="shadcn@example.com" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="username">Username</Label>
        <Input id="username" defaultValue="@shadcn" />
      </div>
      <Button type="submit">Save changes</Button>
    </form>
  );
}
