import getData from '@/projects/components/content/getData';
import setMap from '@/projects/components/content/setMap';
import paintDots from '@/projects/components/content/dots/paintDots';

export default async function projectContent(projectName) {
  try {
    const { map, dots } = await getData(projectName);
    setMap(map);
    paintDots(dots);
  } catch (error) {
    console.log('cannot getData to project', projectName);
  }
};
