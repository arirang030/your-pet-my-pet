const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const authRouter = require('./routes/authRouter');
const profileRouter = require('./routes/profileRouter');
const petRouter = require('./routes/petRouter');
const verifyRouter = require('./routes/verifyRouter');
const adminRouter = require('./routes/adminRouter');
const matchingRouter = require('./routes/matchingRouter');

const { sequelize } = require('./models/index');
const app = express();

app.set('port', process.env.PORT || 3000);

sequelize.sync( { force: false } )
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(cors({
  origin: '*',
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 라우터
app.use('/auth', authRouter);
app.use('/profile', profileRouter);
app.use('/pet', petRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message,
    ...(process.env.NODE_ENV !== 'production' && { error: err }),
  })
});

app.listen(app.get('port'), () => {
  console.log(`${app.get('port')}번 포트에서 서버 실행 중`);
});