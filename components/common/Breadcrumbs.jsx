import Link from "next/link";
import { Container, FullContainer } from "../common";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";

export default function Breadcrumbs({ items = [] }) {
  return (
    <FullContainer>
      <div className="flex items-center space-x-5 py-3 bg-secondary/10 w-full justify-center">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between">
            {index !== items.length - 1 ? (
              <Link
                href={item.href}
                className="flex items-center hover:text-primary border-transparent border-b-2 hover:border-primary text-secondary transition-all"
              >
                {item.name}
                <ChevronDoubleRightIcon className="w-3" />
              </Link>
            ) : (
              <div className="flex items-center border-transparent border-b-2 text-primary font-bold cursor-not-allowed">
                {item.name}
              </div>
            )}
          </div>
        ))}
      </div>
    </FullContainer>
  );
}
