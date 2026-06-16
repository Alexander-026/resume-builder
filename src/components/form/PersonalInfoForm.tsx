"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useResumeStore } from "@/store/resumeStore"
import { personalInfoSchema, type PersonalInfoFormValues } from "@/lib/schemas"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function PersonalInfoForm() {
  const personalInfo = useResumeStore((s) => s.personalInfo)
  const updatePersonalInfo = useResumeStore((s) => s.updatePersonalInfo)

  const { register, watch, formState: { errors } } = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: personalInfo,
    mode: "onChange",
  })

  // Sync form changes into store in real-time
  useEffect(() => {
    const subscription = watch((values) => {
      updatePersonalInfo(values as PersonalInfoFormValues)
    })
    return () => subscription.unsubscribe()
  }, [watch, updatePersonalInfo])

  const field = (name: keyof PersonalInfoFormValues, label: string, placeholder = "", type = "text") => (
    <div className="space-y-1">
      <Label htmlFor={name} className="text-xs">{label}</Label>
      <Input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={errors[name] ? "border-destructive" : ""}
      />
      {errors[name] && <p className="text-xs text-destructive">{errors[name]?.message}</p>}
    </div>
  )

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        {field("firstName", "First Name", "John")}
        {field("lastName", "Last Name", "Doe")}
      </div>
      {field("jobTitle", "Job Title", "e.g. Frontend Developer")}
      <div className="grid grid-cols-2 gap-3">
        {field("email", "Email", "john@example.com", "email")}
        {field("phone", "Phone", "+1 234 567 890")}
      </div>
      {field("address", "Address", "Street and number")}
      <div className="grid grid-cols-3 gap-3">
        {field("city", "City", "Berlin")}
        {field("postalCode", "Postal Code", "10115")}
        {field("country", "Country", "Germany")}
      </div>
      {field("website", "Website / Portfolio", "https://yoursite.com")}
    </div>
  )
}
