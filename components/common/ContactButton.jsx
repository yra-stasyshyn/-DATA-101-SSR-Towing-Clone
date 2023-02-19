import { PhoneIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function ContactButton({
  data,
  className,
  textClass,
  phoneIconClass,
  phoneClass,
  callText
}) {
  return (
    <Link
      title="Click to call us"
      className={`btnPrimary rounded-full w-fit py-3 px-5 lg:px-7 flex items-center text-center gap-3 ${className}`}
      href={`tel:${data}`}
    >
      <span className={`${phoneClass}`}>
        <PhoneIcon className={`h-7 lg:h-9 ${phoneIconClass}`} />
      </span>
      <span>
        <p className={`uppercase font-semibold ${callText}`}>CLICK TO CALL</p>
        <p className={`text-3xl -mt-1 font-bold ${textClass}`}>{data}</p>
      </span>
    </Link>
  );
}
