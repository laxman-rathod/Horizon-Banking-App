import TotalBalanceBox from "@/components/TotalBalanceBox";
import HeaderBox from "@/components/ui/HeaderBox";

const Home = () => {
  const loggedIn = { firstName: "Lucky" };
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || "Guest"}
            subtext="Access and manage your account and transations efficiently."
          />
          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={18383.77}
          />
        </header>
      </div>
    </section>
  );
};

export default Home;
