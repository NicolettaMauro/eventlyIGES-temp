'use client';

import Image from "next/image";
import Link from "next/link";

const Logo = () =>{
   

    
    return (
      <Link href="/">
        <img
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