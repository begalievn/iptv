import s from './styles.module.scss';

export default function NotFound() {
  return (
    <div className={s['not-found']}>
      <h3>Sorry, page not found!</h3>
    </div>
  );
}