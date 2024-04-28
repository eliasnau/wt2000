"use client";
import { CalendarIcon, CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { db } from "@/lib/db";

const sexs = [
  { label: "Mann", value: "male" },
  { label: "Frau", value: "female" },
  { label: "Divers", value: "other" },
] as const;

const formSchema = z.object({
  firstname: z.string().min(1, { message: "Firstname is required" }),
  lastname: z.string().min(1, { message: "Lastname is required" }),
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  sex: z.enum(["male", "female", "other"]),
  birth: z.date(),
  zip: z.number().min(1000).max(99999),
  city: z.string().min(1, { message: "City is required" }),
  street: z.string().min(1, { message: "Street is required" }),
  contractDate: z.date(),
  contractEnd: z.date(),
  contribution: z.number(),
  contractlength: z.enum(["half", "one", "two"]),
  bank: z.string().min(1, { message: "Bank is required" }),
  iban: z.string().min(1, { message: "IBAN is required" }),
  bic: z.string().min(1, { message: "BIC is required" }),
  accountHolder: z.string().min(1, { message: "Account holder is required" }),
  lastnameEb: z.string().optional(),
  firstnameEb: z.string().optional(),
  streetEb: z.string().optional(),
  zipEb: z.number().optional(),
  cityEb: z.string().optional(),
  phoneEb: z.string().optional(),
});

const MemberForm = () => {
  const form = useForm({ resolver: zodResolver(formSchema) });

  const onSubmit = async (values: {
    firstname: any;
    lastname: any;
    name: any;
    email: any;
    phone: any;
    sex: any;
    birth: any;
    zip: any;
    city: any;
    street: any;
    contractDate: any;
    contribution: any;
    bank: any;
    iban: any;
    bic: any;
    accountHolder: any;
    group: any;
  }) => {
    try {
      const newMember = await db.member.create({
        data: {
          firstname: values.firstname,
          lastname: values.lastname,
          name: values.name,
          email: values.email,
          phone: values.phone,
          sex: values.sex,
          birth: values.birth,
          zip: values.zip,
          city: values.city,
          street: values.street,
          contractDate: values.contractDate,
          contractEnd: new Date("2024-12-31"),
          contribution: values.contribution,
          noticePeriod: 30,
          bank: values.bank,
          iban: values.iban,
          bic: values.bic,
          accountHolder: values.accountHolder,
          group: values.group,
        },
      });
    } catch (error) {
      // Handle error
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal Information section */}
        <div className="border bg-slate-100 rounded-md p-4">
          <div className="font-medium flex items-center justify-between">
            Personal Information
          </div>
          <div className="space-y-2 mt-4">
            {/* Firstname */}
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Firstname</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Firstname" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Lastname */}
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lastname</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Lastname" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Phone" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Sex */}
            <FormField
              control={form.control}
              name="sex"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Geschlecht</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Geschlecht" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Mann</SelectItem>
                      <SelectItem value="female">Frau</SelectItem>
                      <SelectItem value="other">Divers</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Birth */}
            <FormField
              control={form.control}
              name="birth"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Zip */}
            <FormField
              control={form.control}
              name="zip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Zip" type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* City */}
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="City" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Street */}
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Street" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Contract section */}
        <div className="border bg-slate-100 rounded-md p-4">
          <div className="font-medium flex items-center justify-between">
            Contract
          </div>
          <div className="space-y-2 mt-4">
            {/* Contract Date */}
            <FormField
              control={form.control}
              name="contractDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Vertragsbegin</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Contract End */}
            <FormField
              control={form.control}
              name="contractEnd"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Vertragsende</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Contribution */}
            <FormField
              control={form.control}
              name="contribution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contribution</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Contribution"
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Contract Length */}
            <FormField
              control={form.control}
              name="contractlength"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vertragslänge</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Vertragslänge" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="half">Halbjährlich</SelectItem>
                      <SelectItem value="one">1 Jahr</SelectItem>
                      <SelectItem value="two">2 Jahre</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Group */}
            <FormField
              control={form.control}
              name="sex"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gruppe</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Gruppe" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="minitigers">Minitigers</SelectItem>
                      <SelectItem value="tigers-mittwoch">
                        Tigers Mittwoch
                      </SelectItem>
                      <SelectItem value="tigers">Tigers Donnerstag</SelectItem>
                      <SelectItem value="dragon">Dragons</SelectItem>
                      <SelectItem value="teens">Teens</SelectItem>
                      <SelectItem value="erwachsene">Erwachsene</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Payment section */}
        <div className="border bg-slate-100 rounded-md p-4">
          <div className="font-medium flex items-center justify-between">
            Payment
          </div>
          <div className="space-y-2 mt-4">
            {/* Bank */}
            <FormField
              control={form.control}
              name="bank"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Bank" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* IBAN */}
            <FormField
              control={form.control}
              name="iban"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>IBAN</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="IBAN" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* BIC */}
            <FormField
              control={form.control}
              name="bic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>BIC</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="BIC" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Account Holder */}
            <FormField
              control={form.control}
              name="accountHolder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Holder</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Account Holder" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Erziehungsberechtigter section */}
        <div className="border bg-slate-100 rounded-md p-4">
          <div className="font-medium flex items-center justify-between">
            Erziehungsberechtigter
          </div>
          <div className="space-y-2 mt-4">
            {/* Firstname Eb */}
            <FormField
              control={form.control}
              name="firstnameEb"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vorname Eb</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Vorname Eb" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Lastname Eb */}
            <FormField
              control={form.control}
              name="lastnameEb"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nachname Eb</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Nachname Eb" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Street Eb */}
            <FormField
              control={form.control}
              name="streetEb"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Straße Eb</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Straße Eb" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Zip Eb */}
            <FormField
              control={form.control}
              name="zipEb"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postleitzahl Eb</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Postleitzahl Eb" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* City Eb */}
            <FormField
              control={form.control}
              name="cityEb"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stadt Eb</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Stadt Eb" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Phone Eb */}
            <FormField
              control={form.control}
              name="phoneEb"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefon Eb</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Telefon Eb" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-center mt-6">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Form>
  );
};

export default MemberForm;
