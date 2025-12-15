'use client';

import Link from "next/link";
import Image from "next/image";

const Logo = () =>{
   

    
    return (
      <Link href="/">
        <Image
          src="/images/evently-logo.png"
          alt="logo"
          width={150}
          height={150}
          loading="eager"
        />
        </Link>
    )
  }

export default Logo;