import { useJobItemsContext } from "../libs/hooks";
import JobList from "./JobList";

const JobListSearch = () => {
  const { jobItemsSortedAndSliced, isLoading } = useJobItemsContext();
  return <JobList jobItems={jobItemsSortedAndSliced} isLoading={isLoading} />;
};

export default JobListSearch;
