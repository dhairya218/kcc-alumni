"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  RadioGroup, 
  RadioGroupItem 
} from "@/components/ui/radio-group";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Eye, EyeOff, CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { FileUploader } from "@/components/register/FileUploader";

export default function RegisterPage() {
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<"student" | "alumni">("student");
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  // Move schema definitions inside component and memoize them
  const schemas = useMemo(() => {
    const passwordSchema = z.object({
      password: z.string()
        .min(8, { message: "Password must be at least 8 characters" })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
          message: "Password must contain uppercase, lowercase, and number",
        }),
      confirmPassword: z.string(),
    }).refine(data => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });

    const baseSchema = z.object({
      rollNumber: z.string().min(1, { message: "Roll number is required" }),
      firstName: z.string().min(1, { message: "First name is required" }),
      lastName: z.string().min(1, { message: "Last name is required" }),
      dob: z.date({
        required_error: "Date of birth is required",
      }),
      city: z.string().min(1, { message: "City is required" }),
      phoneNumber: z.string().regex(/^\d{10}$/, { message: "Please enter a valid 10-digit phone number" }),
      email: z.string().email({ message: "Please enter a valid email" }),
      courses: z.array(z.string()).min(1, { message: "Please select at least one course" }),
      gender: z.enum(["male", "female", "other"], {
        required_error: "Gender is required",
      }),
    });

    const studentSchema = baseSchema.extend({
      role: z.literal("student"),
      ...passwordSchema.shape,
    });

    const alumniSchema = baseSchema.extend({
      role: z.literal("alumni"),
      certificate: z.instanceof(File).optional(),
      ...passwordSchema.shape,
    });

    return {
      student: studentSchema,
      alumni: alumniSchema,
    };
  }, []);

  const form = useForm({
    resolver: zodResolver(userType === "student" ? schemas.student : schemas.alumni),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      city: "",
      rollNumber: "",
      password: "",
      confirmPassword: "",
      gender: undefined,
      role: userType,
      courses: [],
    },
  });

  const handleUserTypeChange = (value: string) => {
    const newRole = value as "student" | "alumni";
    setUserType(newRole);
    form.reset({ 
      ...form.getValues(),
      role: newRole,
      ...(newRole === "student" && { certificate: undefined })
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const availableCourses = [
    { id: "btech_cse", name: "B.Tech (Computer Science)" },
    { id: "btech_ece", name: "B.Tech (Electronics & Communication)" },
    { id: "btech_me", name: "B.Tech (Mechanical Engineering)" },
    { id: "btech_ce", name: "B.Tech (Civil Engineering)" },
    { id: "bba", name: "BBA" },
    { id: "mba", name: "MBA" },
    { id: "mtech_cse", name: "M.Tech (Computer Science)" },
    { id: "mtech_ece", name: "M.Tech (Electronics & Communication)" },
  ];

  const handleSubmit = async (values: z.infer<typeof schemas.student> | z.infer<typeof schemas.alumni>) => {
    try {
      setIsLoading(true);
      
      // Prepare form data for API
      const formData = new FormData();
      
      // Add all fields to form data
      Object.entries(values).forEach(([key, value]) => {
        if (key === 'certificate' && value instanceof File) {
          formData.append(key, value);
        } else if (key === 'dob' && value instanceof Date) {
          formData.append(key, value.toISOString());
        } else if (key === 'courses' && Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else if (value !== undefined && key !== 'confirmPassword') {
          formData.append(key, String(value));
        }
      });
      
      await register(formData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container max-w-4xl mx-auto py-10 px-4">
      <div className="space-y-6 bg-card p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Create an Account</h1>
          <p className="text-muted-foreground mt-2">
            Join our alumni network and stay connected
          </p>
        </div>

        <Tabs defaultValue="student" value={userType} onValueChange={handleUserTypeChange}>
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="student">Current Student</TabsTrigger>
            <TabsTrigger value="alumni">Alumni</TabsTrigger>
          </TabsList>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Personal Information</h3>

                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dob"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date of Birth</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PP")
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
                                date > new Date() || date < new Date("1940-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Gender</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="male" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Male
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="female" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Female
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="other" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Other
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Contact Information</h3>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="john.doe@example.com" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="10-digit phone number" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="Mumbai" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Academic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Academic Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="rollNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Roll Number</FormLabel>
                        <FormControl>
                          <Input placeholder="KP2023001" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="courses"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Course</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => {
                              const newCourses = selectedCourses.includes(value)
                                ? selectedCourses.filter(course => course !== value)
                                : [...selectedCourses, value];
                              
                              setSelectedCourses(newCourses);
                              field.onChange(newCourses);
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select courses" />
                            </SelectTrigger>
                            <SelectContent>
                              {availableCourses.map((course) => (
                                <SelectItem key={course.id} value={course.id}>
                                  {course.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormDescription>
                          Selected: {selectedCourses.map(id => {
                            const course = availableCourses.find(c => c.id === id);
                            return course ? course.name : id;
                          }).join(", ")}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Certificate Upload for Alumni */}
                {userType === "alumni" && (
                  <FormField
                    control={form.control}
                    name="certificate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Certificate Upload</FormLabel>
                        <FormControl>
                          <FileUploader
                            accept=".pdf,.jpg,.jpeg,.png"
                            maxSize={5 * 1024 * 1024} // 5MB
                            onFileChange={(file) => field.onChange(file)}
                          />
                        </FormControl>
                        <FormDescription>
                          Upload your degree certificate or proof of graduation (PDF, JPG, PNG, max 5MB)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              {/* Password Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Security</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              type={showPassword ? "text" : "password"} 
                              placeholder="••••••••" 
                              {...field} 
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-full px-3"
                              onClick={togglePasswordVisibility}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormDescription>
                          Password must be at least 8 characters with uppercase, lowercase, and number
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              type={showConfirmPassword ? "text" : "password"} 
                              placeholder="••••••••" 
                              {...field} 
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-full px-3"
                              onClick={toggleConfirmPasswordVisibility}
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full md:w-auto" disabled={isLoading}>
                {isLoading ? "Registering..." : "Register"}
              </Button>

              <div className="text-center text-sm">
                <p className="text-muted-foreground">
                  Already have an account?{" "}
                  <Link href="/login" className="text-primary font-medium hover:underline">
                    Login here
                  </Link>
                </p>
              </div>
            </form>
          </Form>
        </Tabs>
      </div>
    </div>
  );
}