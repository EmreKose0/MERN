import React, {
  createContext,
  useContext,
  useState,
  useNavgiation,
  useEffect,
} from "react";
import {
  Outlet,
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import { BigSidebar, Navbar, SmallSidebar, Loading } from "../components";
import { checkDefaultTheme } from "../App";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

const userQuery = {
  queryKey: ["user"],
  queryFn: async () => {
    const { data } = await customFetch("/users/current-user");
    return data;
  },
};

export const loader = (queryClient) => async () => {
  //sayfa yuklenırken data göndermek gerekıes burayı kullanıcaz

  try {
    return await queryClient.ensureQueryData(userQuery);
    // const { data } = await customFetch.get("/users/current-user"); //cookie deki jwt ile birlikte
    // return data;
  } catch (error) {
    return redirect("/");
  }
};

const DashboardContext = createContext();

function DashboardLayout({ queryClient }) {
  // const { user } = useLoaderData();
  const { user } = useQuery(userQuery).data;
  const navigate = useNavigate();
  const navigation = useNavigation(); //loading kısmı için
  const isPageLoading = navigation.state === "loading"; //loading kısmı için

  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme);

  const [isAuthError, setIsAuthError] = useState(false);

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle("dark-theme", newDarkTheme); //vanilla
    localStorage.setItem("darkTheme", newDarkTheme); //Sayfa yenilendigine sıfırlamaması için
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async () => {
    navigate("/");
    await customFetch.get("/auth/logout");
    queryClient.invalidateQueries(); //cache temizlemek icin, yoksa React query deki bilgiler kalır

    toast.success("Logging out");
  };

  // customFetch.interceptors.response.use(
  //   //eger kullanıcı 401 hatası alırsa logout yaptırıyor burası
  //   (response) => {
  //     return response;
  //   },
  //   (error) => {
  //     if (error?.response?.status === 401) {
  //       setIsAuthError(true);
  //     }
  //     return Promise.reject(error);
  //   }
  // );

  // useEffect(() => {
  //   if (!isAuthError) return logoutUser();
  // }, [isAuthError]);

  return (
    <DashboardContext.Provider //Yukarıdaki parametreleri aşağıya geçmek için kullandık
      value={{
        //props seklinde de verilebilri o zamna globalcontext e gerk yok
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />

          <div>
            <Navbar />
            <div className="dashboard-page">
              {isPageLoading ? <Loading /> : <Outlet context={{ user }} />}

              {/* bu yapıyı kullanan componentlere user ı atar, access from other components */}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
}

export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;
