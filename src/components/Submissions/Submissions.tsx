import { useSelector } from "react-redux";
import SubmissionCard from "../SubmissionCard/SubmissionCard";
import type { RootState } from "../../store/store";

function Submissions(){
const submissions = useSelector((state:RootState) => state.submissions);

return (<>
<h3>Submissions</h3>
  <div className="cards">
    {submissions.map((item) => (
      <SubmissionCard key={item.id} data={item} />
    ))}
  </div>
  </>
);
}
export default Submissions;