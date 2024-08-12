export default async function getData(projectName) {
  const url = `files/json/projects/${projectName}.json`;
  try {
    const data = await fetch(url);
    const projectData = await data.json();
    return projectData;
  } catch (error) {
    console.log('project not found');
  }
  return '';
};
