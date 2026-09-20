
const useCurrentUser = () => [ 
  JSON.parse(localStorage.getItem("localStorageCurrentUser"))
];

export default useCurrentUser;

/*
function useLoginStatus() {
    const navigate = useNavigate();
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const { currentUser, setLoginState} = useContext(LoginContext);

    useEffect(() => {
      const data = localStorage.getItem("localStorageCurrentUser");
      const currentUserLoggedIn = JSON.parse(data);
      setLoginState(currentUserLoggedIn);
      //if(currentUserLoggedIn == 'null' || currentUserLoggedIn == null) {
      if(currentUserLoggedIn == 'null') {
        setUserLoggedIn(false);

        //console.log("Logged In Page: DONT BE HERE");
        navigate("/login");
      } else {
        setUserLoggedIn(true);
        //console.log("Logged In Page: OK STAY HERE")
        //console.log(currentUserLoggedIn + " is currently logged in");
      }
   }, []);

    return { currentUser, userLoggedIn }
}

export default useLoginStatus;
*/