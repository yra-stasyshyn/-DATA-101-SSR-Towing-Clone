import Link from "next/link";

const CallLink = ({ phone, className }) => {
  return (
    <Link className={`btnPrimary ${className}`} href={`tel:${phone}`}>
      {phone}
    </Link>
  );
};

export default CallLink;
