import GrassIcon from '@mui/icons-material/Grass';
import SearchIcon from '@mui/icons-material/Search';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const features = [
  {
    icon: <CameraAltIcon />,
    title: '雑草の撮影・選択',
    description: (
      <>
        スマホで雑草をその場で撮影、
        <br />
        またはフォトライブラリから
        <br />
        アップロードしてください
      </>
    ),
  },
  {
    icon: <GrassIcon />,
    title: '雑草撮影×土壌診断',
    description: (
      <>
        雑草写真からAIが
        <br />
        畑の土壌コンディションを解析
      </>
    ),
  },
  {
    icon: <SearchIcon />,
    title: '最適野菜レコメンド',
    description: (
      <>
        あなたの土壌に合う
        <br />
        野菜品種を自動提案
      </>
    ),
  },
];

export default features;
