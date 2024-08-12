import aboutItemLayout from '@/projects/components/content/popups/about/aboutItemLayout';
export default function getAboutItems(parent, content) {
  parent.innerHTML = '';
  content.forEach(item => {
    parent.innerHTML += aboutItemLayout(item);
  });
};
