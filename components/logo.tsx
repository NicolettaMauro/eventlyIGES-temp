import Image from "next/image";

const EventlyLogo = () => {
  return (
    <div className="flex gap-1 items-center">
    <Image
        src="/images/only-logo-white.png"
        alt="Logo Evently"
        width={34}
        height={34}
        quality={75}
        priority
        placeholder="empty"
      />      <h4 className="font-bold font-sans tracking-wide opacity-90">
        Evently
      </h4>
    </div>
  );
};

export default EventlyLogo;
