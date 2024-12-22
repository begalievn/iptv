import { FC } from 'react'
import s from './styles.module.scss';
import PlayIcon from '../icons/play';
import InfoIcon from '../icons/info';
import { Playlist } from '../../../infrastructure/class/playlist';

interface IContentItem {
  playlist: Playlist;
}

const PlaylistItem: FC<IContentItem> = (props) => {
  const { playlist } = props;

  return (
    <div className={s['item']}>
      <button className={s['play-btn']}>
        <PlayIcon />
      </button>
      <div className={s['content']}>
        <p>{playlist.title}</p>
        <p>{playlist.updatedAt.toLocaleDateString()}</p>
      </div>
      <div className={s['info']}>
        <InfoIcon className={s['info-icon']} />
      </div>
    </div>
  )
}

export default PlaylistItem;
