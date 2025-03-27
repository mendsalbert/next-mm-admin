import { redirect } from 'next/navigation';
import { screenStyle } from 'theme/components/screen';
export default function Home({}) {
  screenStyle();
  redirect('/admin/default');
}
