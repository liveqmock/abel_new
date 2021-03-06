package org.abel.service.soapengine.core;

/**
 * <p>Title: </p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) 2003</p>
 * <p>Company: </p>
 * @author Abel Wang
 * @version 1.0
 */

import javax.servlet.http.HttpServletRequest;
import org.abel.service.base.db.*;
import org.abel.service.base.common.EIPLogger;
import org.abel.service.base.config.OperationCfg;
//import org.apache.log4j.Level;
//import org.abel.service.base.config.OperationCfg;


//import com.ibm.ais.base.message.MsgObject;

//import java.util.*;

/**
 * @author abelwang
 *
 */
public abstract class ModelBase implements Cloneable {

	public ModelBase() {
		//logger = EIPLogger.getLogger();
	}


//	public abstract ServiceMessage execute(
//			ServiceMessage min)
//		throws Exception ;

	public abstract EIPResultSet execute(OperationCfg opcfg,
			HttpServletRequest req)
		throws Exception;

	
	
	public Object clone() {
		Object o = null;
		try {
			o = super.clone();
		} catch (CloneNotSupportedException e) {
				e.printStackTrace();
		}
		return o;
	}

	protected String name;
	protected boolean multiThreadSupported;
	protected EIPLogger logger;
}