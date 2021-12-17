import projectApi from 'api/projectApi';
import { useEffect, useState } from 'react';

export default function useProjectDetail(projectId) {
  const [project, setProject] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isSubscribe = true;
    const getProjectDetail = async () => {
      try {
        setLoading(true);
        const data = await projectApi.getProjectDetail(projectId);
        isSubscribe && setProject(data.content);
      } catch (error) {
        console.log('Fail to get project detail', error);
      } finally {
        isSubscribe && setLoading(false);
      }
    };
    getProjectDetail();

    return () => (isSubscribe = false);
  }, [projectId]);

  return [project, project?.members, loading];
}
