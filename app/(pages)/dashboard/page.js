import AreaChartGraph from "../../../components/Dashboard/AreaChartGraph";
import Wellcomepage from "../../../components/Dashboard/Wellcomepage";
import Projects from "../../../components/Dashboard/Projects";

export const dynamic = "force-dynamic";
export default function DashboardPage() {
  return (
    <>
      <div className="mt-24 ml-20">
        <Wellcomepage />
        <AreaChartGraph />
        <Projects />
      </div>
    </>
  );
}
