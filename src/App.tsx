import { Button } from '@/components';
import { FilterCheckBox } from '@/components/shared';

function App() {
  return (
    <>
      <h1 className="text-4xl text-purple-700">Tailwind ui-kit </h1>
      <div>
        <Button variant="outline">ui-kit button</Button>
      </div>
      <div className="text-xs text-purple-700">
        <FilterCheckBox text={'ui-kit checkBox'} value={'1'}></FilterCheckBox>
      </div>
    </>
  );
}

export default App;
