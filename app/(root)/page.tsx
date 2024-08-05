import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import HeaderBox from "@/components/ui/HeaderBox";
import { getLoggedInUser } from "@/lib/actions/user.actions";

const Home = async () => {
  const loggedIn = await getLoggedInUser();
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.name || "Guest"}
            subtext="Access and manage your account and transations efficiently."
          />
          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={18383.77}
          />
        </header>
        RESENT TRANSACTIONS
      </div>
      <RightSidebar
        user={loggedIn}
        transactions={[]}
        banks={[{ currentBalance: 3984 }, { currentBalance: 8575 }]}
      />
    </section>
  );
};

export default Home;
