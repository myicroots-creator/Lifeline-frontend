// "use client";

// import type React from "react";

// import { useState } from "react";
// import Link from "next/link";
// import { useRouter, useSearchParams } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Heart,
//   Mail,
//   Lock,
//   User,
//   Building2,
//   Phone,
//   Loader2,
// } from "lucide-react";

// export default function RegisterPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const defaultRole = searchParams.get("role") || "hospital";

//   const [isLoading, setIsLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     role: defaultRole,
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//     organization: "",
//     bloodType: "",
//   });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);

//     // Simulate registration
//     await new Promise((resolve) => setTimeout(resolve, 1500));

//     // Redirect based on role
//     if (formData.role === "hospital") {
//       router.push("/hospital/dashboard");
//     } else if (formData.role === "admin") {
//       router.push("/admin/dashboard");
//     } else {
//       router.push("/donor/dashboard");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-background p-4 py-12">
//       <div className="w-full max-w-md">
//         <div className="flex items-center justify-center gap-2 mb-8">
//           {/* <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
//             <Heart className="h-7 w-7 text-primary-foreground fill-current" />
//           </div> */}
//           <div className="flex items-center justify-center">
//             <img
//               src="/lifeline.png"
//               alt="Lifeline Logo"
//               className="h-12 w-12 object-contain"
//             />
//           </div>

//           <span className="text-2xl font-bold">Lifeline</span>
//         </div>

//         <Card className="border-border">
//           <CardHeader className="space-y-1">
//             <CardTitle className="text-2xl font-bold">
//               Create an account
//             </CardTitle>
//             <CardDescription>
//               Enter your information to get started
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="role">I am a</Label>
//                 <Select
//                   value={formData.role}
//                   onValueChange={(value) =>
//                     setFormData({ ...formData, role: value })
//                   }
//                 >
//                   <SelectTrigger>
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="hospital">Hospital</SelectItem>
//                     <SelectItem value="donor">Donor</SelectItem>
//                     <SelectItem value="admin">Admin</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               {formData.role === "hospital" && (
//                 <div className="space-y-2">
//                   <Label htmlFor="organization">Hospital Name</Label>
//                   <div className="relative">
//                     <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                     <Input
//                       id="organization"
//                       placeholder="City General Hospital"
//                       className="pl-10"
//                       value={formData.organization}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           organization: e.target.value,
//                         })
//                       }
//                       required
//                     />
//                   </div>
//                 </div>
//               )}

//               <div className="space-y-2">
//                 <Label htmlFor="name">
//                   {formData.role === "hospital"
//                     ? "Contact Person"
//                     : "Full Name"}
//                 </Label>
//                 <div className="relative">
//                   <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="name"
//                     placeholder="John Doe"
//                     className="pl-10"
//                     value={formData.name}
//                     onChange={(e) =>
//                       setFormData({ ...formData, name: e.target.value })
//                     }
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="email">Email</Label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="email"
//                     type="email"
//                     placeholder="you@example.com"
//                     className="pl-10"
//                     value={formData.email}
//                     onChange={(e) =>
//                       setFormData({ ...formData, email: e.target.value })
//                     }
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="phone">Phone Number</Label>
//                 <div className="relative">
//                   <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="phone"
//                     type="tel"
//                     placeholder="+234 (555) 000-0000"
//                     className="pl-10"
//                     value={formData.phone}
//                     onChange={(e) =>
//                       setFormData({ ...formData, phone: e.target.value })
//                     }
//                     required
//                   />
//                 </div>
//               </div>

//               {formData.role === "donor" && (
//                 <div className="space-y-2">
//                   <Label htmlFor="bloodType">Blood Type</Label>
//                   <Select
//                     value={formData.bloodType}
//                     onValueChange={(value) =>
//                       setFormData({ ...formData, bloodType: value })
//                     }
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select your blood type" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="A+">A+</SelectItem>
//                       <SelectItem value="A-">A-</SelectItem>
//                       <SelectItem value="B+">B+</SelectItem>
//                       <SelectItem value="B-">B-</SelectItem>
//                       <SelectItem value="AB+">AB+</SelectItem>
//                       <SelectItem value="AB-">AB-</SelectItem>
//                       <SelectItem value="O+">O+</SelectItem>
//                       <SelectItem value="O-">O-</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               )}

//               <div className="space-y-2">
//                 <Label htmlFor="password">Password</Label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="password"
//                     type="password"
//                     placeholder="••••••••"
//                     className="pl-10"
//                     value={formData.password}
//                     onChange={(e) =>
//                       setFormData({ ...formData, password: e.target.value })
//                     }
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="confirmPassword">Confirm Password</Label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="confirmPassword"
//                     type="password"
//                     placeholder="••••••••"
//                     className="pl-10"
//                     value={formData.confirmPassword}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         confirmPassword: e.target.value,
//                       })
//                     }
//                     required
//                   />
//                 </div>
//               </div>

//               <Button type="submit" className="w-full" disabled={isLoading}>
//                 {isLoading ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Creating account...
//                   </>
//                 ) : (
//                   "Create account"
//                 )}
//               </Button>
//             </form>

//             <div className="mt-6 text-center text-sm">
//               <span className="text-muted-foreground">
//                 Already have an account?{" "}
//               </span>
//               <Link
//                 href="/auth/login"
//                 className="text-primary hover:underline font-medium"
//               >
//                 Sign in
//               </Link>
//             </div>
//           </CardContent>
//         </Card>

//         <div className="mt-6 text-center">
//           <Link
//             href="/"
//             className="text-sm text-muted-foreground hover:text-foreground transition-colors"
//           >
//             ← Back to home
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Heart,
  Mail,
  Lock,
  Unlock,
  User,
  Building2,
  Phone,
  Loader2,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultRole = searchParams.get("role") || "hospital";

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    role: defaultRole,
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    organization: "",
    bloodType: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match. Please re-enter.");
      return;
    }

    setError("");
    setIsLoading(true);

    // Simulate registration
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Redirect based on role
    if (formData.role === "hospital") {
      router.push("/hospital/dashboard");
    } else if (formData.role === "admin") {
      router.push("/admin/dashboard");
    } else {
      router.push("/donor/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <img
            src="/lifeline.png"
            alt="Lifeline Logo"
            className="h-12 w-12 object-contain"
          />
          <span className="text-2xl font-bold">Lifeline</span>
        </div>

        <Card className="border-border">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
            <CardDescription>
              Enter your information to get started
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Role selection */}
              <div className="space-y-2">
                <Label htmlFor="role">I am a</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) =>
                    setFormData({ ...formData, role: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hospital">Hospital</SelectItem>
                    <SelectItem value="donor">Donor</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Hospital org name */}
              {formData.role === "hospital" && (
                <div className="space-y-2">
                  <Label htmlFor="organization">Hospital Name</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="organization"
                      placeholder="City General Hospital"
                      className="pl-10"
                      value={formData.organization}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          organization: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>
              )}

              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">
                  {formData.role === "hospital" ? "Contact Person" : "Full Name"}
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="John Doe"
                    className="pl-10"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+234 (555) 000-0000"
                    className="pl-10"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              {/* Blood Type for donors */}
              {formData.role === "donor" && (
                <div className="space-y-2">
                  <Label htmlFor="bloodType">Blood Type</Label>
                  <Select
                    value={formData.bloodType}
                    onValueChange={(value) =>
                      setFormData({ ...formData, bloodType: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your blood type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-3 text-muted-foreground"
                  >
                    {showPassword ? (
                      <Unlock className="h-4 w-4" />
                    ) : (
                      <Lock className="h-4 w-4" />
                    )}
                  </button>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute left-3 top-3 text-muted-foreground"
                  >
                    {showConfirmPassword ? (
                      <Unlock className="h-4 w-4" />
                    ) : (
                      <Lock className="h-4 w-4" />
                    )}
                  </button>
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                {error && (
                  <p className="text-red-500 text-sm mt-1">{error}</p>
                )}
              </div>

              {/* Submit */}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create account"
                )}
              </Button>
            </form>

            {/* Sign in link */}
            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">
                Already have an account?{" "}
              </span>
              <Link
                href="/auth/login"
                className="text-primary hover:underline font-medium"
              >
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Back to home */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
