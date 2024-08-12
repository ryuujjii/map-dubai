import amenitiesItemLayout from '@/projects/components/content/popups/about/amenitiesItemLayout';

export default function getAmenitiesItems(parent, content) {
  parent.innerHTML = '';
  content.forEach(item => {
    parent.innerHTML += amenitiesItemLayout(item);
  });
};
