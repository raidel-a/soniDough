'use client'

import Box from "@/components/Box";
import { BounceLoader, ClimbingBoxLoader } from "react-spinners";

const Loading = () => {
  return ( <Box className='h-full flex items-center justify-center'>
    <ClimbingBoxLoader color="#22c5" size={40} />
  </Box> );
}
 
export default Loading;