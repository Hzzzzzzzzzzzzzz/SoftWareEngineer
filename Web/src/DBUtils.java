import java.sql.*;

public class DBUtils {
    private static final String DBDRIVER = "com.mysql.jdbc.Driver";//驱动类类名
    private static final String DBNAME = "webservice";//数据库名
    private static final String DBURL = "jdbc:mysql://localhost:3306/" + DBNAME+"?useSSL=false";//连接URL
    private static final String DBUSER = "root";//数据库用户名
    private static final String DBPASSWORD = "@abcD123456";//数据库密码
    private static Connection conn = null;
    private static PreparedStatement ps = null;
    private static ResultSet rs = null;

    //获取数据库连接
    public static Connection getConn() {
        try {
            Class.forName(DBDRIVER);//注册驱动
            conn = DriverManager.getConnection(DBURL, DBUSER, DBPASSWORD);//获得连接对象
        } catch (Exception e) {//捕获驱动类无法找到异常
            e.printStackTrace();
        }
        return conn;
    }
}