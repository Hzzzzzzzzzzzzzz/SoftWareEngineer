import java.io.IOException;
import java.net.URL;
import java.net.URLConnection;
import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.sun.xml.internal.bind.v2.schemagen.xmlschema.List;

import net.sf.json.JSON;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import sun.net.www.http.HttpClient;

/**
 * Servlet implementation class service
 */

@WebServlet("/service")
public class service extends HttpServlet {
	private static final long serialVersionUID = 1L;
    /**
     * @see HttpServlet#HttpServlet()
     */
    public service() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		final int GetUserPwd = 111 ,GetUserData=213, INSERT = 222 , DELETE = 333, ALTER = 444 , GetEngineerData = 555;
		Map<String,String> primaryKeyMap= new HashMap<>();
		primaryKeyMap.put("useraccount","user_id");
		primaryKeyMap.put("userdata","user_id");
		primaryKeyMap.put("edu","education_id");
		primaryKeyMap.put("mapping","engineer&user_id");
		primaryKeyMap.put("engineer","engineer_id");
		primaryKeyMap.put("engineerdetails","engineer_id");
		try {
			int id,sex;
			String userName,user_name,password,synopsis,author;
			response.setContentType("text/html");
			request.setCharacterEncoding("utf-8");
			response.setCharacterEncoding("utf-8");
			Connection connection = DBUtils.getConn();
			String condition = request.getParameter("condition").trim();
			switch (Integer.parseInt(condition)) {
			case GetUserPwd:
				userName = request.getParameter("userName");
				try {
	                String sql = "select password from useraccount where userName = ?";
	                PreparedStatement ps = connection.prepareStatement(sql);
	                ps.setString(1, userName);
	                ResultSet resultSet = ps.executeQuery();
					Map<String,String>map = new HashMap<String, String>();
	                if (resultSet != null) {
						resultSet.next();
						map.put("password", resultSet.getString(1));
						JSONObject jsonObject = JSONObject.fromObject(map);
						response.getWriter().write(jsonObject.toString());
					}else {
						response.getWriter().write("error : NullPointerException");
					}
				}
				catch (Exception e) {
	    			response.getWriter().write("error : dont get pwd or user_id");
	                e.printStackTrace();
	            }
				return;
			case GetUserData:
				userName = request.getParameter("userName");
				try {
					String sql = "select name,sex,password from useraccount join userdata on useraccount.user_id = " +
							"userdata.user_id where userName = ?";
					PreparedStatement ps = connection.prepareStatement(sql);
					ps.setString(1, userName);
					ResultSet resultSet = ps.executeQuery();
					Map<String, String> map = new HashMap<>();
					if (resultSet != null) {
						resultSet.next();
						map.put("name", resultSet.getString(1));
						if (resultSet.getInt(2) == 1)
							map.put("sex", "男");
						else if (resultSet.getInt(2) == 2)
							map.put("sex", "女");
						else
							map.put("sex", "未知");
						map.put("password", "" + resultSet.getInt(3));
						JSONObject jsonObject = JSONObject.fromObject(map);
						response.getWriter().write(jsonObject.toString());
					} else {
						response.getWriter().write("error : NullPointerException");
					}
				}catch (Exception e) {
					response.getWriter().write("error : dont get UserData");
					e.printStackTrace();
				}
				return;
			case GetEngineerData:
				id = Integer.parseInt(request.getParameter("engineer_id"));
				try {
					String sql = "select * from (engineer join engineerdetails " +
							"on engineer.engineer_id = engineerdetails.engineer_id)" +
							"join edu on edu.education_id = engineer.education_id " +
							"where engineer.engineer_id = ?";
					PreparedStatement ps = connection.prepareStatement(sql);
					ps.setInt(1,id);
					ResultSet resultSet = ps.executeQuery();
					if(resultSet!=null){
						resultSet.next();
						ResultSetMetaData resultSetMetaData = resultSet.getMetaData();
						int colNum = resultSetMetaData.getColumnCount();
						Map<String,String> map = new HashMap<>();
						for(int i=0;i<colNum;i++){
							map.put(resultSetMetaData.getColumnName(i+1),resultSet.getString(i+1));
						}
						JSONObject jsonObject = JSONObject.fromObject(map);
						response.getWriter().write(jsonObject.toString());
					}else {
						response.getWriter().write("error : NullPointerException");
					}
				}catch (Exception e){
					response.getWriter().write("error : dont get EngineerData");
					e.printStackTrace();
				}
				return;
			case ALTER:
				return;
			case DELETE:
				String tableName = request.getParameter("tableName");
				String primaryKey = request.getParameter("primaryKey");
				try{
					String sql = String.format("delete from %s where %s = %s",tableName
							,primaryKeyMap.get(tableName),primaryKey);
					PreparedStatement ps = connection.prepareStatement(sql);
					ps.execute();
					response.getWriter().write("sql execute ok");
				} catch (Exception e){
					response.getWriter().write(String.format(
							"error : the row in table %s not exist",tableName));
					e.printStackTrace();
				}
				return;
			case INSERT:
				int insert_type = Integer.parseInt(request.getParameter("insert_type"));
				int user_id,education_id;
				String sql;
				PreparedStatement ps;
				ResultSet rs;
				try {
					switch (insert_type) {
						case 1:
							userName = request.getParameter("userName");
							password = request.getParameter("password");
							sex = Integer.parseInt(request.getParameter("user_sex"));
							user_name = request.getParameter("user_name");
							sql = "insert into useraccount (userName,password) values (?,?)";
							ps = connection.prepareStatement(sql);
							ps.setString(1,userName);
							ps.setString(2,password);
							ps.execute();
							sql = "select user_id from userAccount where userName = ?";
							ps = connection.prepareStatement(sql);
							ps.setString(1,userName);
							rs = ps.executeQuery();
							if(rs!=null){
								rs.next();
								user_id = rs.getInt(1);
								sql = "insert into userdata (user_id,name,sex) values (?,?,?)";
								ps = connection.prepareStatement(sql);
								ps.setInt(1,user_id);
								ps.setString(2,user_name);
								ps.setInt(3,sex);
								ps.execute();
							}
							break;
						case 2:
							String education = request.getParameter("education");
							String engineer_name = request.getParameter("engineer_name");
							int engineer_sex = Integer.parseInt(request.getParameter("engineer_sex"));
							String birthday = request.getParameter("birthday");
							int mobile = Integer.parseInt(request.getParameter("mobile"));
							String address = request.getParameter("address");
							String nativeplace = request.getParameter("nativeplace");
							int engineer_id;
							int workingYears = Integer.parseInt(request.getParameter("workingYears"));
							int salary = Integer.parseInt(request.getParameter("salary"));
							sql = "select education_id from edu where education = ?";
							ps = connection.prepareStatement(sql);
							ps.setString(1,education);
							rs = ps.executeQuery();
							if(rs!=null){
								rs.next();
								education_id = rs.getInt(1);
								sql = "insert into engineer (workingYears,salary,education_id) values (?,?,?)";
								ps = connection.prepareStatement(sql);
								ps.setInt(1,workingYears);
								ps.setInt(2,salary);
								ps.setInt(3,education_id);
								ps.execute();
								sql = "select MAX(engineer_id) from engineer";
								ps = connection.prepareStatement(sql);
								rs = ps.executeQuery();
								if(rs!=null){
									rs.next();
									engineer_id = rs.getInt(1);
									sql = "insert engineerdetails (engineer_id,name,sex,birthday,mobile,address,nativeplace)" +
											" values (?,?,?,?,?,?,?)";
									ps  = connection.prepareStatement(sql);
									ps.setInt(1,engineer_id);
									ps.setString(2,engineer_name);
									ps.setInt(3,engineer_sex);
									ps.setString(4,birthday);
									ps.setInt(5,mobile);
									ps.setString(6,address);
									ps.setString(7,nativeplace);
									ps.execute();
								}
							}
							break;
						case 3:
							user_id = Integer.parseInt(request.getParameter("user_id"));
							engineer_id = Integer.parseInt(request.getParameter("engineer_id"));
							sql = "insert into mapping (engineer_id,user_id) values (?,?)";
							ps = connection.prepareStatement(sql);
							ps.setInt(1,engineer_id);
							ps.setInt(2,user_id);
							ps.execute();
							break;
						default:
							response.getWriter().write("插入操作类型不存在");
							return;
					}
				}catch (Exception e){
					e.printStackTrace();
					response.getWriter().write("error : insert error");
					return;
				}
				response.getWriter().write("插入成功");
				return;
			default:
				response.getWriter().write("condition输入不正确");
				break;
			}
		} catch (Exception e) {
			e.printStackTrace();
			response.getWriter().write("error");
			// TODO: handle exception
		}
	}
}
