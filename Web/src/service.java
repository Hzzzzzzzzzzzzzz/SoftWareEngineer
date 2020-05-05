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
//		doPost(request, response);
		response.setHeader("Access-Control-Allow-Origin","*");
		response.setHeader("Access-Control-Allow-Methods","GET");
		response.setHeader("Access-Control-Allow-Headers","x-requested-with,content-type");
		final int GetUserPwd = 111 ,GetUserData=213, INSERT = 222 , DELETE = 333, UPDATA = 444 , GetEngineerData = 555 , GetAllInformation = 666;
		Map<String,String> primaryKeyMap= new HashMap<>();
		primaryKeyMap.put("useraccount","user_id");
		primaryKeyMap.put("userdata","user_id");
		primaryKeyMap.put("edu","education_id");
		primaryKeyMap.put("mapping","engineer&user_id");
		primaryKeyMap.put("engineer","engineer_id");
		primaryKeyMap.put("engineerdetails","engineer_id");
		try {
			int id,sex,insert_type,user_id,education_id = -1,engineer_id;
			String userName,user_name,password,tmp,author;
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
					id = Integer.parseInt(request.getParameter("enginner_id"));
					try {
						String sql = "select * from (engineer join engineerdetails " +
								"on engineer.engineer_id = engineerdetails.engineer_id)" +
								"join edu on edu.education_id = engineer.education_id " +
								"where engineer.engineer_id = ?";
						PreparedStatement ps = connection.prepareStatement(sql);
						ps.setInt(1, id);
						ResultSet resultSet = ps.executeQuery();
						if (resultSet != null) {
							resultSet.next();
							ResultSetMetaData resultSetMetaData = resultSet.getMetaData();
							int colNum = resultSetMetaData.getColumnCount();
							Map<String, String> map = new HashMap<>();
							for (int i = 0; i < colNum; i++) {
								map.put(resultSetMetaData.getColumnName(i + 1), resultSet.getString(i + 1));
							}
							JSONObject jsonObject = JSONObject.fromObject(map);
							response.getWriter().write(jsonObject.toString());
						} else {
							response.getWriter().write("error : NullPointerException");
						}
					} catch (Exception e) {
						response.getWriter().write("error : dont get EngineerData");
						e.printStackTrace();
					}
					return;
				case UPDATA:
					insert_type = Integer.parseInt(request.getParameter("insert_type"));
					switch (insert_type){
						case 1:
							//用户
							PreparedStatement ps;
							String sql = "";
							userName = request.getParameter("userName");
							password = request.getParameter("password");
							user_name = request.getParameter("user_name");
							tmp = request.getParameter("user_id");
							if(tmp.isEmpty()){
								response.getWriter().write("error: need user_id");
								return;
							}
							user_id = Integer.parseInt(tmp);
							if(userName.isEmpty()){
								if(!(password.isEmpty())){
									sql = String.format("update useraccount set password = %s where user_id" +
											" = %d",password,user_id);
								}
							}else{
								if(!(password.isEmpty())){
									sql = String.format("update useraccount set password = %s , userName = %s " +
											"where user_id = %d",password,userName,user_id);
									System.out.println(sql);
								}else{
									sql = String.format("update useraccount set userName = %s where user_id" +
											" = %d",userName,user_id);
								}
							}
							if(!sql.isEmpty()) {
								ps = connection.prepareStatement(sql);
								ps.execute();
							}
							tmp = request.getParameter("user_sex"); // tmp 是性别 为1 0
							if(tmp.isEmpty()){
								if(!(user_name.isEmpty())){
									sql = String.format("update userdata set name = %s where user_id" +
											" = %d",user_name,user_id);
								}
							}else{
								if(!(user_name.isEmpty())){
									sql = String.format("update userdata set name = '%s' , sex = %s " +
											"where user_id = %d",user_name,tmp,user_id);
								}else{
									sql = String.format("update userdata set sex = %s where user_id" +
											" = %d",tmp,user_id);
								}
							}
							if(!sql.isEmpty()){
								ps = connection.prepareStatement(sql);
								ps.execute();
							}
							response.getWriter().write("update ok");
							return;
						case 2:
							//工程师
							tmp = request.getParameter("engineer_id");
							if(tmp.isEmpty()){
								response.getWriter().write("need a engineer_id");
								return;
							}else{
								engineer_id = Integer.parseInt(tmp);
								StringBuilder s = new StringBuilder();
								s.append("update engineer set engineer_id = ").append(tmp);
								String []data = new String[2];
								String []n = {"workingYears","salary"};
								for(int i =0;i<2;i++){
									data[i] = request.getParameter(n[i]);
									if(!data[i].isEmpty()){
										s.append(" ,").append(n[i]).append(" = ").append(data[i]);
									}
								}
								String education = request.getParameter("education");
								if(!education.isEmpty()){
									try {
										sql = "select education_id from edu where education = ?";
										ps = connection.prepareStatement(sql);
										ps.setString(1, education);
										ResultSet resultSet = ps.executeQuery();
										if (resultSet.next()) {
											education_id = resultSet.getInt(1);
											s.append(" ,education_id = ").append(education_id);
										}
									}catch (Exception e){
										response.getWriter().write("error: please insert right education name");
										return;
									}
								}
								try {
									sql = s.append(" where engineer_id = ").append(engineer_id).toString();
									ps = connection.prepareStatement(sql);
									ps.execute();
								}catch (Exception e){
									e.printStackTrace();
									response.getWriter().write("error: update engineer error");
									return;
								}
								String[] m = {"engineer_name","birthday","address","nativeplace"};
								String[] data_details = new String[4];
								s = new StringBuilder("update engineerdetails set engineer_id = ").append(engineer_id);
								for(int i=0;i<4;i++){
									data_details[i] = request.getParameter(m[i]);
									if(!data_details[i].isEmpty()){
										s.append(" , ").append(m[i]).append(" = '").append(data_details[i]).append("'");
									}
								}
								String[] k = {"engineer_sex","mobile"};
								data_details = new String[2];
								for(int i=0;i<2;i++){
									data_details[i] = request.getParameter(k[i]);
									if(!data_details[i].isEmpty()){
										s.append(" , ").append(k[i]).append(" = ").append(data_details[i]);
									}
								}
								sql  = s.append(" where engineer_id = ").append(engineer_id).toString();
								sql = sql.replace("engineer_name","name")
										.replace("engineer_sex","sex");
								try {
									ps = connection.prepareStatement(sql);
									ps.execute();
									response.getWriter().write("update engineer ok");
								}catch (Exception e){
									e.printStackTrace();
									response.getWriter().write("error: update engineerdetails error");
									return;
								}
							}
							return;
						case 3:
							//mapping
							String tmp_user_id = request.getParameter("update_user_id");
							String tmp_engineer_id = request.getParameter("update_engineer_id");
							user_id = Integer.parseInt(request.getParameter("user_id"));
							engineer_id = Integer.parseInt(request.getParameter("engineer_id"));
							if(!tmp_engineer_id.isEmpty()){
								if(!tmp_user_id.isEmpty()) {
									response.getWriter().write("error: too much parameters");
									return;
								}
								int update_engineer_id = Integer.parseInt(tmp_engineer_id);
								sql  = String.format("update mapping set engineer_id = %d where engineer_id " +
										"= %d and user_id = %s",update_engineer_id,engineer_id,user_id);
							}else{
								if(tmp_user_id.isEmpty()){
									response.getWriter().write("error: need a parameter");
									return;
								}
								int update_user_id = Integer.parseInt(tmp_user_id);
								sql  = String.format("update mapping set user_id = %d where engineer_id " +
										"= %d and user_id = %s",update_user_id,engineer_id,user_id);
							}
							try {
								ps = connection.prepareStatement(sql);
								ps.execute();
								response.getWriter().write("updata ok");
							}catch (SQLException e){
								e.printStackTrace();
								response.getWriter().write("error: update error");
							}
							return;
						default:
							response.getWriter().write("error: need insert_type");
							break;
					}
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
					insert_type = Integer.parseInt(request.getParameter("insert_type"));
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
				case GetAllInformation:
					String[] sqls = new String[3];
					sqls[0] = "select * from userdata join useraccount on userdata.user_id = useraccount.user_id";
					sqls[1] = "select * from (engineer join engineerdetails " +
							"on engineer.engineer_id = engineerdetails.engineer_id)"+
							"join edu on edu.education_id = engineer.education_id";
					sqls[2] = "select * from mapping";
					try {
						insert_type = Integer.parseInt(request.getParameter("insert_type"));
						JSONArray jsonArray = new JSONArray();
						ps = connection.prepareStatement(sqls[insert_type - 1]);
						ResultSet resultSet = ps.executeQuery();
						while (resultSet.next()) {
							ResultSetMetaData resultSetMetaData = resultSet.getMetaData();
							int colNum = resultSetMetaData.getColumnCount();
							Map<String, String> map = new HashMap<>();
							for (int i = 0; i < colNum; i++) {
								map.put(resultSetMetaData.getColumnName(i + 1), resultSet.getString(i + 1));
							}
							JSONObject jsonObject = JSONObject.fromObject(map);
							jsonArray.add(jsonObject);
						}
						response.getWriter().write(jsonArray.toString());
					}catch (Exception e){
						e.printStackTrace();
						response.getWriter().write("error: please insert right type");
					}
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

	@Override
	protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setHeader("Access-Control-Allow-Origin","*");
		resp.setHeader("Access-Control-Allow-Methods","GET");
		resp.setHeader("Access-Control-Allow-Headers","x-requested-with,content-type");
		super.doOptions(req, resp);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
//		super(request,response);
	}
}
