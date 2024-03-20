import Image from "next/image";
import { Inter } from "next/font/google";
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import HookForm from "@/components/Login";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
<>
<HookForm/>
</>
  );
}
