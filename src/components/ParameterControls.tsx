
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ParameterControlsProps {
  parameters: {
    steps: number[];
    cfgScale: number[];
    seed: number;
    aspectRatio: string;
  };
  onParameterChange: (param: string, value: any) => void;
}

const ParameterControls = ({ parameters, onParameterChange }: ParameterControlsProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold font-inter">Fine-tune Parameters</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2 font-inter">
            Steps: {parameters.steps[0]}
          </label>
          <Slider
            value={parameters.steps}
            onValueChange={(value) => onParameterChange('steps', value)}
            max={50}
            min={10}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-foreground/60 mt-1 font-inter">
            <span>Fast (10)</span>
            <span>Balanced (25)</span>
            <span>Quality (50)</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 font-inter">
            CFG Scale: {parameters.cfgScale[0]}
          </label>
          <Slider
            value={parameters.cfgScale}
            onValueChange={(value) => onParameterChange('cfgScale', value)}
            max={20}
            min={1}
            step={0.5}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-foreground/60 mt-1 font-inter">
            <span>Creative (1)</span>
            <span>Balanced (7)</span>
            <span>Precise (20)</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 font-inter">Aspect Ratio</label>
          <Select value={parameters.aspectRatio} onValueChange={(value) => onParameterChange('aspectRatio', value)}>
            <SelectTrigger className="glass border-purple-500/30 font-inter">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="glass-premium border-purple-500/20">
              <SelectItem value="1:1">Square (1:1)</SelectItem>
              <SelectItem value="16:9">Landscape (16:9)</SelectItem>
              <SelectItem value="9:16">Portrait (9:16)</SelectItem>
              <SelectItem value="4:3">Classic (4:3)</SelectItem>
              <SelectItem value="3:2">Photo (3:2)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 font-inter">
            Seed: {parameters.seed}
          </label>
          <div className="flex space-x-2">
            <Slider
              value={[parameters.seed]}
              onValueChange={(value) => onParameterChange('seed', value[0])}
              max={999999}
              min={0}
              step={1}
              className="flex-1"
            />
            <button
              onClick={() => onParameterChange('seed', Math.floor(Math.random() * 999999))}
              className="px-3 py-1 text-xs glass border border-purple-500/30 rounded hover:border-purple-500 transition-colors font-inter"
            >
              Random
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParameterControls;
