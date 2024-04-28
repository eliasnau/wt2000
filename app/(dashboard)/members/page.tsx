import { db } from "@/lib/db";
import { redirect } from "next/navigation";

import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

const MembersPage = async () => {
  /*
        Find all the courses created by the   
        user logged in and sort by most recent
    */
  //   const courses = await db.course.findMany({
  //     where: {
  //       userId,
  //     },
  //     orderBy: {
  //       createdAt: "desc",
  //     },
  //   });

  return (
    <div className="p-6">
      <DataTable columns={columns} data={members} />
    </div>
  );
};

type Member = {
  id: string;
  firstname: string;
  lastname: string;
  name: string;
  email: string;
  phone: string;
  sex: "male" | "female" | "other";
  birth: Date;
  zip: number;
  city: string;
  street: string;

  contractDate: Date;
  contractEnd: Date;
  group: string;
  contribution: number;
  noticePeriod: number;

  bank: string;
  iban: string;
  bic: string;
  accountHolder: string;

  lastnameEb?: string;
  firstnameEb?: string;
  streetEb?: string;
  zipEb?: number;
  cityEb?: string;
  phoneEb?: string;
};

const members: Member[] = [
  {
    id: "728ed52f",
    firstname: "Elias",
    lastname: "Nau",
    name: "Elias Nau",
    email: "test@example.com",
    phone: "+4915227761162",
    sex: "male",
    birth: new Date("2021-01-01"),
    zip: 83071,
    city: "Stephanskirchen",
    street: "Breitensteinstraße 42",
    group: "teen",
    contractDate: new Date("2021-01-01"),
    contractEnd: new Date("2021-01-01"),
    contribution: 59.99,
    noticePeriod: 2,
    bank: "VoBa RaiB ...",
    iban: "DE424242424242",
    bic: "GENODEF1S04",
    accountHolder: "Elias Nau",

    // Ensure that optional properties are either of type string or null
    lastnameEb: undefined,
    firstnameEb: undefined,
    streetEb: undefined,
    zipEb: undefined,
    cityEb: undefined,
    phoneEb: undefined,
  },
  // Add more member objects as needed
];

export default MembersPage;
