import projectApi from 'api/projectApi';
import { useEffect, useState } from 'react';

export default function useProjectCategory() {
  const [projectCategories, setProjectCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isSubscribe = true;
    try {
      setLoading(true);
      (async () => {
        const { content } = await projectApi.getProjectCategory();
        isSubscribe && setProjectCategories(content);
      })();
    } catch (error) {
      console.log('Fail to get project category', error);
    } finally {
      isSubscribe && setLoading(false);
    }
    return () => (isSubscribe = false);
  }, []);

  return [projectCategories, loading];
}
