import SpeedSvg from '../assets/speed.svg';
import AccelerationSvg from '../assets/acceleration.svg';
import ForceSvg from '../assets/force.svg';
import GasolineSvg from '../assets/gasoline.svg';
import EnergySvg from '../assets/energy.svg';
import HybridSvg from '../assets/hybrid.svg';
import ExchangeSvg from '../assets/exchange.svg';
import PeopleSvg from '../assets/people.svg';
import { SvgProps } from 'react-native-svg';

interface IconProps {
  [speed: string]: React.FC<SvgProps>;
}

export function getAccessoryIcon(type: string): React.FC<SvgProps> {
  const icons: IconProps = {
    speed: SpeedSvg,
    acceleration: AccelerationSvg,
    turning_diameter: ForceSvg,
    gasoline_motor: GasolineSvg,
    electric_motor: EnergySvg,
    hybrid_motor: HybridSvg,
    exchange: ExchangeSvg,
    seats: PeopleSvg,
  }

  return icons[type] || GasolineSvg;
}