'use client'
import Link from "next/link"
import { CircleUser, Menu, Package2, Search, Handshake } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getAccessToken, getUserId, resetAuthCookies } from "../../../lib/actions";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button"
import BannerWarningFillProfile from "./banner-warning-fill-profile"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { LoginForm } from "../elements/login-popup"
import ApiService from "../../../services/apiService";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { usePopup } from "./popup-context"
import { FeatchPersonalProfile, logoutUser, type UserProfileType } from "../profileAPIs";

export function MenuBar() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfileType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleLogout = async () => {
    await logoutUser();
  };

  const { openLoginForm } = usePopup();

  useEffect(() => {
    const fetchToken = async () => {
      const accessToken = await getAccessToken();
      setToken(accessToken);
      const userId = await getUserId();
      setUserId(userId);
    };
    fetchToken();
  }, [token, userId]);

  const openSignupForm = () => {
    router.push('/register');
  }

  const handleButtonClick = () => {
    if (token) {
      router.push('/create-trip');
    } else {
      openLoginForm('/create-trip');
    }
  };
  
  useEffect(() => {
    async function fetchProfileData() {
      try {
        setIsLoading(true);
        const profileData = await FeatchPersonalProfile();
        setUserProfile(profileData);
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast(`Error fetching profile data: ${error}`, {
          action: {
            label: "Close",
            onClick: () => toast.dismiss(),
          },
        });
        setToken(null);
        setUserId(null);
        setUserProfile(null);
      } finally {
        setIsLoading(false);
      }
    }
  
    if (token) {
      fetchProfileData();
    }
  }, [token]);


  return (
    <>
      {token && userProfile && (!userProfile.photo || !userProfile.name) && (
        <BannerWarningFillProfile />
      )}
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-white px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <img src="/logo.svg" alt="Logo" className="h-10 w-13" />
            <span className="sr-only">Share Trips</span>
          </Link>
          <Link
            href="/about"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            About
          </Link>
          <Link
            href="/"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Trips
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="/"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <img src="/logo.svg" alt="Logo" className="h-10 w-13" />
                <span className="sr-only">Share Trips</span>
              </Link>
              <Link
                href="/about"
                className="text-muted-foreground hover:text-foreground"
              >
                About
              </Link>
              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground"
              >
                Trips
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <div className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Button variant="outline" onClick={handleButtonClick}>
                Add Trip
              </Button>
            </div>
          </div>
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              {isLoading ? (
                <Skeleton className="h-8 w-8 rounded-full">
                  <CircleUser className="h-8 w-8" />
                </Skeleton>
              ) : token && userProfile?.photo ? (
                <img src={typeof userProfile?.photo === 'string' ? userProfile.photo : ""} alt="User Photo" className="h-8 w-8 rounded-full" />
              ) : (
                <CircleUser className="h-8 w-8" />
              )}
              <span className="sr-only">Toggle user menu</span>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {token ? (
            <>
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => router.push(`/profile/${userProfile?.username}`)}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem onClick={() => openLoginForm('/')}>Login</DropdownMenuItem>
              <DropdownMenuItem onClick={openSignupForm}>Sign Up</DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </header>
  </>
)
}