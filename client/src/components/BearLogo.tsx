import { NAVY, WHITE, BEAR_PATH } from '../tokens';

interface Props {
  size?: number;
  light?: boolean;
}

export default function BearLogo({ size = 36, light = false }: Props) {
  const clr = light ? WHITE : NAVY;
  return (
    <svg width={size} height={size} viewBox="0 0 352 352" fill="none">
      <path d={BEAR_PATH} fill={clr} />
    </svg>
  );
}
