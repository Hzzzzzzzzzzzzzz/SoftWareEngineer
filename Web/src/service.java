import java.io.IOException;
import java.net.URL;
import java.net.URLConnection;
import java.sql.*;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Timer;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.crypto.Data;

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

	public String getDate(){
		java.util.Date date= new java.util.Date();
		SimpleDateFormat time = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return time.format(date);
	}

	public void insert(String record,Connection connection){
		String sql_record = String.format("insert into records (data,time) values ('%s','%s')",record,getDate());
		try {
			PreparedStatement ps_re = connection.prepareStatement(sql_record);
			ps_re.executeUpdate();
		}catch (SQLException e){
			e.printStackTrace();
		}
	}

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
		final int GetUserPwd = 111 ,GetUserData=213, INSERT = 222 , DELETE = 333, UPDATA = 444 , GetEngineerData = 555 , GetAllInformation = 666,DELETE_=777,CLEAR=888,GETRECORD=999;
		Map<String,String> primaryKeyMap= new HashMap<>();
		primaryKeyMap.put("useraccount","user_id");
		primaryKeyMap.put("userdata","user_id");
		primaryKeyMap.put("edu","education_id");
		primaryKeyMap.put("mapping","engineer&user_id");
		primaryKeyMap.put("engineer","engineer_id");
		primaryKeyMap.put("engineerdetails","engineer_id");
		ResultSet rs;
		try {
			int id,sex,insert_type,user_id,education_id = -1,engineer_id;
			String userName,user_name,password,tmp,sql,sql_record,record;
			PreparedStatement ps_re;
			ResultSet rs_re;
			response.setContentType("text/html");
			request.setCharacterEncoding("utf-8");
			response.setCharacterEncoding("utf-8");
			Connection connection = DBUtils.getConn();
			String condition = request.getParameter("condition").trim();
			switch (Integer.parseInt(condition)) {
				case GetUserPwd:
					userName = request.getParameter("userName");
					try {
						sql = "select password from useraccount where userName = ?";
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
					tmp = request.getParameter("userName");
					if(tmp.isEmpty()){
						sql = String.format("select name,sex,password,useraccount.user_id,userName from useraccount join userdata on useraccount.user_id = " +
								"userdata.user_id where userdata.user_id = %d",Integer.parseInt(request.getParameter("user_id")));
						PreparedStatement ps = connection.prepareStatement(sql);
						ResultSet resultSet = ps.executeQuery();
						Map<String, String> map = new HashMap<>();
						if (resultSet.next()) {
							map.put("name", resultSet.getString(1));
							map.put("sex", "" + resultSet.getString(2));
							map.put("password", "" + resultSet.getString(3));
							map.put("user_id",String.valueOf(resultSet.getInt(4)));
							map.put("userName",resultSet.getString(5));
							JSONObject jsonObject = JSONObject.fromObject(map);
							response.getWriter().write(jsonObject.toString());
						} else {
							response.getWriter().write("error : NullPointerException");
						}
					}else {
						sql = String.format("select name,sex,password,useraccount.user_id,userName from useraccount join userdata on useraccount.user_id = " +
								"userdata.user_id where userName = '%s'",tmp);
						PreparedStatement ps = connection.prepareStatement(sql);
						ResultSet resultSet = ps.executeQuery();
						Map<String, String> map = new HashMap<>();
						if (resultSet.next()) {
							map.put("name", resultSet.getString(1));
							map.put("sex", "" + resultSet.getString(2));
							map.put("password", "" + resultSet.getString(3));
							map.put("user_id",String.valueOf(resultSet.getInt(4)));
							userName = resultSet.getString(5);
							map.put("userName",userName);
							JSONObject jsonObject = JSONObject.fromObject(map);
							response.getWriter().write(jsonObject.toString());
						} else {
							response.getWriter().write("error : NullPointerException");
							return;
						}
						record = String.format("用户名为%s的用户尝试登陆",userName);
						sql_record = String.format("insert into records (data,time) values ('%s','%s')",record,getDate());
						ps_re = connection.prepareStatement(sql_record);
						ps_re.executeUpdate();
					}
					return;
				case GetEngineerData:
					tmp = request.getParameter("engineer_id");
					boolean keyIsId = false;
					if(tmp.isEmpty()){
						tmp = request.getParameter("engineer_name");
						sql = String.format("select * from (engineer join engineerdetails " +
								"on engineer.engineer_id = engineerdetails.engineer_id)" +
								"join edu on edu.education_id = engineer.education_id " +
								"where engineerdetails.name = '%s'",tmp);
					}else {
						id = Integer.parseInt(tmp);
						sql = String.format("select * from (engineer join engineerdetails " +
								"on engineer.engineer_id = engineerdetails.engineer_id)" +
								"join edu on edu.education_id = engineer.education_id " +
								"where engineer.engineer_id = %d",id);
						keyIsId = true;
					}
					PreparedStatement ps = connection.prepareStatement(sql);
					ResultSet resultSet = ps.executeQuery();
					JSONArray jsonArray = new JSONArray();
					resultSet.last();
					resultSet.beforeFirst();
					while (resultSet.next()) {
						if(!request.getParameter("user_id").isEmpty()) {
							engineer_id = resultSet.getInt(1);
							user_id = Integer.parseInt(request.getParameter("user_id"));
							sql = String.format("select * from mapping where user_id = %d and engineer_id = %d ",user_id,engineer_id);
							ps = connection.prepareStatement(sql);
							rs=ps.executeQuery();
							if(rs.next()){
								ResultSetMetaData resultSetMetaData = resultSet.getMetaData();
								int colNum = resultSetMetaData.getColumnCount();
								Map<String, String> map = new HashMap<>();
								for (int i = 0; i < colNum; i++) {
									map.put(resultSetMetaData.getColumnName(i + 1), resultSet.getString(i + 1));
								}
								JSONObject jsonObject = JSONObject.fromObject(map);
								jsonArray.add(jsonObject);
							}

							if(keyIsId)
								record = String.format("id为%d的用户查询id为%s的工程师",user_id,tmp);
							else
								record = String.format("id为%d的用户查询名字为%s的工程师",user_id,tmp);
							sql_record = String.format("insert into records (data,time) values ('%s','%s')",record,getDate());

						}else {
							ResultSetMetaData resultSetMetaData = resultSet.getMetaData();
							int colNum = resultSetMetaData.getColumnCount();
							Map<String, String> map = new HashMap<>();
							for (int i = 0; i < colNum; i++) {
								map.put(resultSetMetaData.getColumnName(i + 1), resultSet.getString(i + 1));
							}
							JSONObject jsonObject = JSONObject.fromObject(map);
							jsonArray.add(jsonObject);

							if(keyIsId)
								record = String.format("管理员查询id为%s的工程师",tmp);
							else
								record = String.format("管理员查询名字为%s的工程师",tmp);
							sql_record = String.format("insert into records (data,time) values ('%s','%s')",record,getDate());

						}

						ps_re = connection.prepareStatement(sql_record);
						ps_re.executeUpdate();

					}
					if(!jsonArray.isEmpty())
						response.getWriter().write(jsonArray.toString());
					else
						response.getWriter().write("error: 该工程师不存在或者该工程师不隶属于该用户");
					return;
				case UPDATA:
					insert_type = Integer.parseInt(request.getParameter("insert_type"));
					switch (insert_type) {
						case 1:
							//用户
							sql = "";
							PreparedStatement ps_update;
							userName = request.getParameter("userName");
							password = request.getParameter("password");
							user_name = request.getParameter("user_name");
							tmp = request.getParameter("user_id");
							if (tmp.isEmpty()) {
								sql = String.format("select user_id from useraccount where userName = '%s'", request.getParameter("userName"));
								ps_update = connection.prepareStatement(sql);
								rs = ps_update.executeQuery();
								if (rs.next()) {
									user_id = rs.getInt(1);
								} else {
									response.getWriter().write("error:需要user_id或者用户名或者该用户不存在");
									return;
								}
							} else {
								user_id = Integer.parseInt(tmp);
							}
							if (userName.isEmpty()) {
								if (!(password.isEmpty())) {
									sql = String.format("update useraccount set password = '%s' where user_id" +
											" = %d", password, user_id);
								}
							} else {
								if (!(password.isEmpty())) {
									sql = String.format("update useraccount set password = '%s' , userName = '%s' " +
											"where user_id = %d", password, userName, user_id);
									System.out.println(sql);
								} else {
									sql = String.format("update useraccount set userName = '%s' where user_id" +
											" = %d", userName, user_id);
								}
							}
							if (!sql.isEmpty()) {
								ps_update = connection.prepareStatement(sql);
								ps_update.execute();
							}
							tmp = request.getParameter("user_sex"); // tmp 是性别 为1 0
							if (tmp.isEmpty()) {
								if (!(user_name.isEmpty())) {
									sql = String.format("update userdata set name = '%s' where user_id" +
											" = %d", user_name, user_id);
								}
							} else {
								if (!(user_name.isEmpty())) {
									sql = String.format("update userdata set name = '%s' , sex = %s " +
											"where user_id = %d", user_name, tmp, user_id);
								} else {
									sql = String.format("update userdata set sex = %s where user_id" +
											" = %d", tmp, user_id);
								}
							}
							if (!sql.isEmpty()) {
								ps_update = connection.prepareStatement(sql);
								ps_update.execute();
							}

							insert(String.format("管理员修改id为%d的用户", user_id),connection);
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
										ps_update = connection.prepareStatement(sql);
										ps_update.setString(1, education);
										resultSet = ps_update.executeQuery();
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
									ps_update = connection.prepareStatement(sql);
									ps_update.execute();
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
									ps_update = connection.prepareStatement(sql);
									ps_update.execute();
									response.getWriter().write("update engineer ok");
									insert(String.format("修改id为%d的工程师的信息",engineer_id),connection);
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
							int update_engineer_id,update_user_id;
							if(!tmp_engineer_id.isEmpty()){
								if(!tmp_user_id.isEmpty()) {
									response.getWriter().write("error: too much parameters");
									return;
								}
								update_engineer_id = Integer.parseInt(tmp_engineer_id);
								sql  = String.format("update mapping set engineer_id = %d where engineer_id " +
										"= %d and user_id = %s",update_engineer_id,engineer_id,user_id);
								record = String.format("管理员将id为%d的工程师划到id为%d的用户旗下",update_engineer_id,user_id);
							}else{
								if(tmp_user_id.isEmpty()){
									response.getWriter().write("error: need a parameter");
									return;
								}
								update_user_id = Integer.parseInt(tmp_user_id);
								sql  = String.format("update mapping set user_id = %d where engineer_id " +
										"= %d and user_id = %s",update_user_id,engineer_id,user_id);
								record = String.format("管理员将id为%d的工程师划到id为%d的用户旗下",engineer_id,update_user_id);
							}
							try {
								ps = connection.prepareStatement(sql);
								ps.execute();
								response.getWriter().write("updata ok");
								sql_record = String.format("insert into records (data,time) values ('%s','%s')",record,getDate());
								ps_re = connection.prepareStatement(sql_record);
								ps_re.executeUpdate();
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
						sql = String.format("delete from %s where %s = %s",tableName
								,primaryKeyMap.get(tableName),primaryKey);
						ps = connection.prepareStatement(sql);
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
					record = "";
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
							sql = "select user_id from useraccount where userName = ?";
							ps = connection.prepareStatement(sql);
							ps.setString(1,userName);
							rs = ps.executeQuery();
							if(rs.next()){
								user_id = rs.getInt(1);
								sql = "insert into userdata (user_id,name,sex) values (?,?,?)";
								ps = connection.prepareStatement(sql);
								ps.setInt(1,user_id);
								ps.setString(2,user_name);
								ps.setInt(3,sex);
								ps.execute();
								record = String.format("管理员创建了用户名为%s的用户",userName);
							}
							break;
						case 2:
							String education = request.getParameter("education");
							String engineer_name = request.getParameter("engineer_name");
							int engineer_sex = Integer.parseInt(request.getParameter("engineer_sex"));
							String birthday = request.getParameter("birthday");
							Long mobile = Long.parseLong(request.getParameter("mobile"));
							String address = request.getParameter("address");
							String nativeplace = request.getParameter("nativeplace");
							int workingYears = Integer.parseInt(request.getParameter("workingYears"));
							int salary = Integer.parseInt(request.getParameter("salary"));
							sql = "select education_id from edu where education = ?";
							ps = connection.prepareStatement(sql);
							ps.setString(1,education);
							rs = ps.executeQuery();
							if(rs.next()){
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
								if(rs.next()){
									engineer_id = rs.getInt(1);
									sql = "insert engineerdetails (engineer_id,name,sex,birthday,mobile,address,nativeplace)" +
											" values (?,?,?,?,?,?,?)";
									ps  = connection.prepareStatement(sql);
									ps.setInt(1,engineer_id);
									ps.setString(2,engineer_name);
									ps.setInt(3,engineer_sex);
									ps.setString(4,birthday);
									ps.setLong(5,mobile);
									ps.setString(6,address);
									ps.setString(7,nativeplace);
									ps.execute();
									user_id = Integer.parseInt(request.getParameter("user_id"));
									sql = String.format("insert mapping (engineer_id,user_id) values (%d,%d)",engineer_id,user_id);
									ps = connection.prepareStatement(sql);
									ps.executeUpdate();
									record = String.format("id为%d的用户插入一条工程师信息",user_id);
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
								record = String.format("管理员将id为%d的工程师归到id为%d的用户下",engineer_id,user_id);
								break;
							default:
								response.getWriter().write("插入操作类型不存在");
								return;
						}
					response.getWriter().write("插入成功");
					sql_record = String.format("insert into records (data,time) values ('%s','%s')",record,getDate());
					ps_re = connection.prepareStatement(sql_record);
					ps_re.executeUpdate();
					return;
				case GetAllInformation:
					tmp = request.getParameter("user_id");
					String[] sqls = new String[3];
					sqls[0] = "select * from userdata join useraccount on userdata.user_id = useraccount.user_id";
					sqls[1] = "select * from (engineer join engineerdetails " +
							"on engineer.engineer_id = engineerdetails.engineer_id)" +
							"join edu on edu.education_id = engineer.education_id";
					sqls[2] = "select * from mapping";
					try {
						insert_type = Integer.parseInt(request.getParameter("insert_type"));
						if(insert_type==2&&(!tmp.isEmpty())){
							sqls[1] = String.format("select * from ( mapping join ((engineer join engineerdetails " +
									"on engineer.engineer_id = engineerdetails.engineer_id)" +
									"join edu on edu.education_id = engineer.education_id) on mapping.engineer_id = engineer.engineer_id) " +
									"where mapping.user_id = %s",tmp);
							record = String.format("id为%s的用户查询他旗下的工程师的信息",tmp);
						}else
							record = "管理员查询所有的工程师的信息";
						if(insert_type==1)
							record = "管理员查询所有的工程师的信息";
						else if(insert_type==3)
							record = "管理员查询所有的工程师与用户的隶属信息";
						jsonArray = new JSONArray();
						ps = connection.prepareStatement(sqls[insert_type - 1]);
						resultSet = ps.executeQuery();
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
						insert(record,connection);
					} catch (Exception e) {
						e.printStackTrace();
						response.getWriter().write("error: please insert right type");
					}
					return;
				case DELETE_:
					String en_id = request.getParameter("engineer_id");
					String u_id = request.getParameter("user_id");
					if((!en_id.isEmpty())&&(!u_id.isEmpty())){
						sql = String.format("delete from mapping where user_id = %s and engineer_id = %s", u_id, en_id);
						ps = connection.prepareStatement(sql);
						if(ps.executeUpdate()==0) {
							response.getWriter().write("error: 这个engineer不存在或者不隶属于该user");
							return;
						}
						if(!request.getParameter("insert_type").equals("3")){
							sqls = new String[2];
							sqls[0] = "delete from engineerdetails where engineer_id = "+en_id;
							sqls[1]="delete from engineer where engineer_id = "+en_id;
							ps = connection.prepareStatement(sqls[0]);
							ps.executeUpdate();
							ps=connection.prepareStatement(sqls[1]);
							ps.execute();
							response.getWriter().write("delete ok");
							insert(String.format("id为%s的用户删除id为%s的工程师信息",u_id,en_id),connection);
							return;
						}
						insert(String.format("管理员将id为%s的工程师信息剔除id为%s的用户旗下",en_id,u_id),connection);
					}else if((!en_id.isEmpty())||(!u_id.isEmpty())){
						sqls = new String[2];
						if(en_id.isEmpty()){
							sqls[0] = "delete from userdata where user_id = "+u_id.toString();
							sqls[1]="delete from useraccount where user_id = "+u_id.toString();
						}else {
							sqls[0] = "delete from engineerdetails where engineer_id = "+en_id.toString();
							sqls[1]="delete from engineer where engineer_id = "+en_id.toString();
						}
						try {
							ps = connection.prepareStatement(sqls[0]);
							if(ps.executeUpdate()==0){
								response.getWriter().write("error: this row not exist");
								return;
							}
							ps=connection.prepareStatement(sqls[1]);
							ps.execute();
							response.getWriter().write("delete ok");
							if(en_id.isEmpty())
								insert(String.format("管理员删除id为%s的用户信息",u_id),connection);
							else
								insert(String.format("管理员删除id为%s的工程师信息",en_id),connection);
							return;
						}catch (SQLException e){
							e.printStackTrace();
							response.getWriter().write("error "+e.toString());
							return;
						}
					}else{
						int c =-1;
						int tmp_id = -1;
						sqls = new String[3];
						String name = request.getParameter("user_name");
						if(!name.isEmpty()){
							c = 1;//user
							sqls[0] = String.format("select user_id from userdata where name = '%s'",name);
						}else{
							name = request.getParameter("engineer_name");
							c = 2;
							sqls[0] = String.format("select engineer_id from engineerdetails where name = '%s'",name);
						}
						ps = connection.prepareStatement(sqls[0]);
						rs = ps.executeQuery();
						if(rs.next()){
							tmp_id = rs.getInt(1);
							switch (c){
								case 1:
									sqls[1] = "delete from userdata where user_id = "+tmp_id;
									sqls[2]="delete from useraccount where user_id = "+tmp_id;
									break;
								case 2:
									sqls[1] = "delete from engineerdetails where engineer_id = "+tmp_id;
									sqls[2]="delete from engineer where engineer_id = "+tmp_id;
									break;
								default:
									break;
							}
							try {
								if(c==1){
									insert(String.format("管理员删除姓名为%s的用户信息",name),connection);
								}else
									insert(String.format("管理员删除姓名为%s的工程师信息",name),connection);
								ps = connection.prepareStatement(sqls[1]);
								ps.execute();
								ps=connection.prepareStatement(sqls[2]);
								ps.execute();
								response.getWriter().write("delete ok");
								return;
							}catch (SQLException e){
								e.printStackTrace();
								response.getWriter().write("error: "+e.toString());
								return;
							}
						}else{
							response.getWriter().write("error: this row not exist");
						}
					}
					return;
				case CLEAR:
					tmp = request.getParameter("userName");
					if(!tmp.isEmpty()){
						sql = String.format("select user_id from useraccount where userName = '%s'",tmp);
						PreparedStatement preparedStatement = connection.prepareStatement(sql);
						rs = preparedStatement.executeQuery();
						if(rs.next()){
							user_id = rs.getInt(1);
						}else {
							response.getWriter().write("error: 该用户不存在");
							return;
						}
					}else{
						user_id = Integer.parseInt(request.getParameter("user_id"));
					}
					sqls = new String[2];
					sqls[0] = String.format("delete from mapping where user_id = %d",user_id);
					try{
						sql = String.format("select engineer_id from mapping where user_id = %d",user_id);
						ps = connection.prepareStatement(sql);
						resultSet = ps.executeQuery();
						resultSet.last();
						int count = resultSet.getRow(),i=count;
						int []account = new int[count];
						resultSet.beforeFirst();
						while(resultSet.next()){
							account[--i] = resultSet.getInt(1);
						}
						sql = String.format("delete from mapping where user_id = %d",user_id);
						ps = connection.prepareStatement(sql);
						ps.executeUpdate();
						for(i=0;i<count;i++){
							sqls[0] = String.format("delete from engineerdetails where engineer_id = %d",account[i]);
							sqls[1] = String.format("delete from engineer where engineer_id = %d",account[i]);
							ps = connection.prepareStatement(sqls[0]);
							ps.executeUpdate();
							ps = connection.prepareStatement(sqls[1]);
							ps.executeUpdate();
						}
					}catch (SQLException e){
						response.getWriter().write("error: "+e.toString());
					}
					tmp = request.getParameter("insert_type");
					if(!tmp.isEmpty()) {
						sqls[0] = String.format("delete from userdata where user_id = %d", user_id);
						sqls[1] = String.format("delete from useraccount where user_id = %d", user_id);
						ps = connection.prepareStatement(sqls[0]);
						ps.executeUpdate();
						ps = connection.prepareStatement(sqls[1]);
						ps.executeUpdate();
						response.getWriter().write("delete ok");
						insert(String.format("管理员删除id为%d的用户和他旗下的工程师信息",user_id),connection);
						return;
					}
					insert(String.format("管理员删除id为%d的用户的旗下工程师信息",user_id),connection);
					return;
				case GETRECORD:
					jsonArray = new JSONArray();
					ps = connection.prepareStatement("select * from records");
					resultSet = ps.executeQuery();
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
					break;
				default:
					response.getWriter().write("error: condition输入不正确");
					break;
		}
	} catch (Exception e) {
		e.printStackTrace();
		response.getWriter().write("error: "+e.toString());
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
